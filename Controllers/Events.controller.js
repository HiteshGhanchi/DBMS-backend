import pool from "../connectDB.js";

const createEvent = async(req,res) => {
    const {tournamentId,SportId,refreeId} = req.body;
    const [rows] = await pool.query("INSERT INTO events (tournamentId,SportId,refreeId) VALUES (?,?,?)",[tournamentId,SportId,refreeId]);
    if(rows.affectedRows > 0){
        return res.status(200).json({message:"Event created successfully"});
    }    
    return res.status(500).json({message:"Event could not be created"});
}

const updateEvent = async(req,res) => {
    const {id} = req.params;
    const {tournamentId,SportId,refreeId} = req.body;
    const [rows] = await pool.query("UPDATE events SET tournamentId = ?,SportId = ?,refreeId = ? WHERE eventId = ?",[tournamentId,SportId,refreeId,id]);
    if(rows.affectedRows > 0){
        return res.status(200).json({message:"Event updated successfully"});
    }    
    return res.status(500).json({message:"Event could not be updated"});
}

const deleteEvent = async(req,res) => {
    const {id} = req.params;
    const [rows] = await pool.query("DELETE FROM events WHERE eventId = ?",[id]);
    if(rows.affectedRows > 0){
        return res.status(200).json({message:"Event deleted successfully"});
    }    
    return res.status(500).json({message:"Event could not be deleted"});
}

const eventInformation = async (req, res) => {
    const { id } = req.params;  
  
    try {   
      const [rows] = await pool.query(
        `SELECT * 
        FROM athlete_event 
        JOIN event ON athlete_event.eventId = event.eventId
        WHERE athlete_event.eventId = ? 
          AND event.end_date < CURRENT_DATE()  
        ORDER BY athlete_event.standing ASC`,
        [id]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "No past event standings found" });
      }
  
      return res.status(200).json(rows);  
    } catch (error) {
      console.error("Error fetching event information:", error);
      return res.status(500).json({ message: "Server error" });
    }
};

const disqualifiedAthleteForEvent = async(req,res) => {
    const {eventId} = req.body;
    const [rows] = await pool.query("SELECT * FROM disqualification WHERE eventId = ?",[eventId]);
    return res.status(200).json(rows);
}
  
export {createEvent,updateEvent,deleteEvent,eventInformation,disqualifiedAthleteForEvent}