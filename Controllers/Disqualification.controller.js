import pool from "../connectDB.js";

const getAllDisqualified = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM disqualification");
    return res.status(200).json(rows);
};

const disqualifyAthlete = async (req, res) => {
    const { eventId, playerId } = req.body;
    const [rows] = await pool.query("INSERT INTO disqualification (eventId, playerId) VALUES (?, ?)", [eventId, playerId]);
    if (rows.affectedRows > 0) {
        return res.status(200).json({ message: "Athlete disqualified successfully" });
    }
    return res.status(500).json({ message: "Athlete could not be disqualified" });
};

export { getAllDisqualified, disqualifyAthlete };