import pool from "../connectDB.js";

const getAllTournaments = async(req,res) => {
    const [rows] = await pool.query("SELECT * FROM tournaments");
    return res.status(200).json(rows);
}

const getTournamentById = async(req,res) => {
    const {id} = req.params;
    const [rows] = await pool.query("SELECT * FROM tournaments WHERE tournamentId = ?",[id]);
    if(rows.length === 0)
        return res.status(404).json({message:"Tournament not found"});
    return res.status(200).json(rows[0]);
}

const createTournament = async(req,res) => {
    const {tournament_name,start_date,end_date} = req.body;

    if(!tournament_name || !start_date || !end_date)
        res.status(400).json({message:"Please enter all the fields"});

    const [rows] = await pool.query("INSERT INTO tournaments (tournament_name,start_date,end_date) VALUES (?,?,?)",[tournament_name,start_date,end_date]);
    if(rows.affectedRows > 0)
        return res.status(200).json({message:"Tournament created successfully"});
    return res.status(500).json({message:"Tournament could not be created"});
}

const updateTournament = async(req,res) => {
    const {id} = req.params;
    const {tournament_name,start_date,end_date} = req.body;

    if(!tournament_name || !start_date || !end_date)
        res.status(400).json({message:"Please enter all the fields"});

    const [rows] = await pool.query("UPDATE tournaments SET tournament_name = ?,start_date = ?,end_date = ? WHERE tournamentId = ?",[tournament_name,start_date,end_date,id]);
    if(rows.affectedRows > 0)
        return res.status(200).json({message:"Tournament updated successfully"});
    return res.status(400).json({message:"Tournament could not be updated"});

}

const deleteTournament = async(req,res) => {
    const {id} = req.params;
    const [rows] = await pool.query("DELETE FROM tournaments WHERE tournamentId = ?",[id]);
    if(rows.affectedRows > 0)
        return res.status(200).json({message:"Tournament deleted successfully"});
    return res.status(400).json({message:"Tournament could not be deleted"});
}

const getAllEventsfromTournament = async(req,res) => {
    const {id} = req.params;
    const [rows] = await pool.query("SELECT * FROM events WHERE tournamentId = ?",[id]);
    return res.status(200).json(rows);
}

const getStandingsForTournament = async(req,res) => {
    const {id} = req.params;
    const [rows] = await pool.query("SELECT * FROM standings  WHERE tournamentId = ? ORDER BY total_points DESC",[id]);
    return res.status(200).json(rows);
}

export {
    getAllTournaments,
    getTournamentById,
    createTournament,
    updateTournament,
    deleteTournament,
    getAllEventsfromTournament,
    getStandingsForTournament
}