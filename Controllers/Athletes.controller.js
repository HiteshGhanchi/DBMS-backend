import pool from "../connectDB.js";
import cloudinary from "cloudinary";
import fs from "fs";

const getAllAthletes = async(req,res) =>{
    const [rows] = await pool.query(`SELECT athlete.PlayerId, 
            athlete.name AS Name, 
            athlete.DOB, 
            athlete.Height, 
            athlete.photourl,
            athlete.Weight,sport.name AS sportName,country.name AS countryName FROM athlete JOIN sport ON athlete.sportId = sport.sportId JOIN country ON athlete.countryId = country.countryId`);
    return res.status(200).json(rows);
}

const getAlthleteById = async(req,res) =>{
    const {id} = req.params;
    const [rows] = await pool.query(`SELECT 
            athlete.PlayerId, 
            athlete.name AS athleteName, 
            athlete.DOB, 
            athlete.Height, 
            athlete.Weight,
            athlete.photourl,
            country.name AS countryName, 
            country.countryId,
            sport.name AS sportName, 
            sport.sportId,
            coach.coachId,
            coach.name AS coachName
            FROM athlete
            JOIN country ON athlete.countryId = country.countryId
            JOIN sport ON athlete.sportId = sport.sportId
            JOIN coach ON athlete.coachId = coach.coachId
            WHERE athlete.PlayerId = ?`,[id]);
    if(rows.length === 0)
        return res.status(404).json({message:"Athlete not found"});
    
    
    return res.status(200).json(rows[0]);   
}

const createAthlete = async (req, res) => {
    const { Name, DOB, Height, Weight, SportId, coachId, countryId } = req.body;
    const photo = req.file;
    let photoUrl = null;
  
    try {
      if (photo) {
        // Upload to Cloudinary using the file path
        const cloudinaryResponse = await cloudinary.uploader.upload(photo.path, {
          folder: 'athletes_photos',
          public_id: `athlete_${Date.now()}`,
          resource_type: 'image',
        });
  
        photoUrl = cloudinaryResponse.secure_url;
  
        // After uploading, you can delete the file from local disk
        fs.unlinkSync(photo.path);
      }
  
      // Insert into MySQL database
      const [rows] = await pool.query(
        "INSERT INTO athlete (Name, DOB, Height, Weight, SportId, coachId, countryId, photourl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [Name, DOB, Height, Weight, SportId, coachId, countryId, photoUrl]
      );
  
      if (rows.affectedRows > 0) {
        return res.status(200).json({ message: "Athlete created successfully" });
      }
  
      return res.status(500).json({ message: "Athlete could not be created" });
    } catch (error) {
        console.log(error)
      return res.status(500).json({ message: "Something went wrong", error });
    }
  };

  const updateAthlete = async (req, res) => {
    const { id } = req.params; 
    const { Name, DOB, Height, Weight, SportId, coachId, countryId } = req.body;
    const photo = req.file;
    
    let photoUrl = null;
  
    // Check for required fields
    if (!Name || !DOB || !Height || !Weight || !SportId || !coachId || !countryId) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Check if the athlete exists
      const [existingAthlete] = await pool.query(
        `SELECT * FROM athlete WHERE PlayerId = ?`,
        [id]
      );
    
      if (existingAthlete.length === 0) {
        return res.status(404).json({ message: "Athlete not found" });
      } 
  
      // If a new photo is provided, upload it
      if (photo) {
        const cloudinaryResponse = await cloudinary.uploader.upload(photo.path, {
          folder: 'athletes_photos',
          public_id: `athlete_${id}`,
          resource_type: 'image',
        });
  
        photoUrl = cloudinaryResponse.secure_url;
        fs.unlinkSync(photo.path); // Remove the file from local storage
      } else {
        // If no new photo is provided, keep the existing photo URL
        photoUrl = existingAthlete[0].photourl;
      }
      console.log(Name)
      console.log(photoUrl)
      // Update the athlete's details in the database
      const [updateResult] = await pool.query(
        `UPDATE athlete 
          SET Name = ?, DOB = ?, Height = ?, Weight = ?, SportId = ?, coachId = ?, countryId = ?, photourl = ?
          WHERE PlayerId = ?`,
        [Name, DOB, Height, Weight, SportId, coachId, countryId, photoUrl, id]
      );
  
      if (updateResult.affectedRows > 0) {
        return res.status(200).json({ message: 'Athlete updated successfully' });
      }
  
      return res.status(500).json({ message: 'Failed to update athlete' });
  
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  

const deleteAthlete = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if there are any dependent rows in the 'disqualification' table
      const [disqualificationCheck] = await pool.query(
        'SELECT * FROM disqualification WHERE playerId = ?',
        [id]
      );

      const [athleteEventCheck] = await pool.query(
        'SELECT * FROM athlete_event WHERE PlayerId = ?',
        [id]
      );
  
      if (disqualificationCheck.length > 0) {
        // Delete the dependent rows in 'disqualification' table
        await pool.query('DELETE FROM disqualification WHERE playerId = ?', [id]);
      }

      if (athleteEventCheck.length > 0) 
        await pool.query('DELETE FROM athlete_event WHERE PlayerId = ?', [id]);
  
      const [rows] = await pool.query('DELETE FROM athlete WHERE PlayerId = ?', [id]);
  
      if (rows.affectedRows > 0) {
        return res.status(200).json({ message: "Athlete deleted successfully" });
      }
  
      return res.status(500).json({ message: "Athlete could not be deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong", error });
    }
  };
  

const getAthleteHistory = async(req,res) =>{
    const {id} = req.params;
    const [rows] = await pool.query("SELECT * FROM athlete_history WHERE PlayerId = ?",[id]);
    if(rows.length === 0)
        return res.status(404).json({message:"Athlete history not found"});
    return res.status(200).json(rows);
}

const getAllEventsForAthlete = async(req,res) => {
    const {id} = req.params;
    const [rows] = await pool.query(`SELECT 
    athlete_event.eventId, 
    tournaments.tournament_name AS tournamentName, 
    athlete_event.standing, 
    refree.name AS refereeName
FROM 
    athlete_event 
JOIN 
    events ON events.eventId = athlete_event.eventId
JOIN 
    tournaments ON events.tournamentId = tournaments.tournamentId
JOIN 
    refree ON events.refreeId = refree.refreeId
WHERE 
    athlete_event.PlayerId = ?;
`,[id]);
    
    return res.status(200).json(rows);
}


export {getAllAthletes,
        getAlthleteById,
        createAthlete,
        updateAthlete,
        deleteAthlete,
        getAthleteHistory,
        getAllEventsForAthlete
    }