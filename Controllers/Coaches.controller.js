import pool from "../connectDB.js";

const getAllCoaches = async(req,res) =>{
    const [rows] = await pool.query("SELECT * FROM coach");
    return res.status(200).json(rows);
}

const getCoachesById = async(req,res) =>{
    const id = req.params;
    const [rows] = await pool.query("SELECT * FROM coach WHERE = ?",[id]);
    return res.status(200).json(rows);
}

const createCoach = async(req,res) =>{
    const {name ,age,exp,SportId} = req.body;

    const [rows] = await pool.query("INSERT INTO coach (name,age,exp,SportId) VALUES (?,?,?,?)",[name,age,exp,SportId]);

    if(rows.affectedRows > 0){
        return res.status(200).json({message:"Coach created successfully"});
    }

    return res.status(500).json({message:"Coach could not be created"});

}

const deleteCoach = async(req,res) =>{
    const {id} = req.params;
    const [rows] = await pool.query("DELETE FROM coach WHERE coachId = ?",[id]);

    if(rows.affectedRows > 0){
        return res.status(200).json({message:"Coach deleted successfully"});
    }
    return res.status(500).json({message:"Coach could not be deleted"});
}

export {
    getAllCoaches,
    getCoachesById,
    deleteCoach,
    createCoach,
}