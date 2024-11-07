import pool from "../connectDB.js";

const getAllAthletes = async(req,res) =>{
    const [rows] = await pool.query("SELECT * FROM athlete");
    return res.status(200).json(rows);
}

const getAlthleteById = async(req,res) =>{
    const {id} = req.params;
    const [rows] = await pool.query("SELECT * FROM athlete WHERE PlayerId = ?",[id]);
    if(rows.length === 0)
        return res.status(404).json({message:"Athlete not found"});
    
    return res.status(200).json(rows[0]);   
}

const createAthlete = async(req,res) =>{
const {Name , DOB,Height,Weight,SportId,coachId,countryId} = req.body;

const [rows] = await pool.query("INSERT INTO athlete (Name, DOB,Height,Weight,SportId,coachId,countryId) VALUES (?,?,?,?,?,?,?)",[Name , DOB,Height,Weight,SportId,coachId,countryId]);

if(rows.affectedRows > 0){
    return res.status(200).json({message:"Athlete created successfully"});
}

return res.status(500).json({message:"Athlete could not be created"});

}

const updateAthlete = async(req,res) =>{
    const {id} = req.params;
    const {Name , DOB,Height,Weight,SportId,coachId,countryId} = req.body;

    if(!Name || !DOB || !Height || !Weight || !SportId || !coachId || !countryId){
        return res.status(400).json({message:"Please enter all the fields"});
    }
    
    const [rows] = await pool.query("UPDATE athlete SET Name = ?, DOB = ?,Height = ?,Weight = ?,SportId = ?,coachId = ?,countryId = ? WHERE PlayerId = ?",[Name , DOB,Height, Weight,SportId,coachId,countryId,id]);


    if(rows.affectedRows > 0){
        return res.status(200).json({message:"Athlete updated successfully"});
    }
    return res.status(500).json({message:"Athlete could not be updated"});
}

const deleteAthlete = async(req,res) =>{
    const {id} = req.params;
    const [rows] = await pool.query("DELETE FROM athlete WHERE PlayerId = ?",[id]);

    if(rows.affectedRows > 0){
        return res.status(200).json({message:"Athlete deleted successfully"});
    }
    return res.status(500).json({message:"Athlete could not be deleted"});
}




export {getAllAthletes,
        getAlthleteById,
        createAthlete,
        updateAthlete,
        deleteAthlete,
    }