import { Router } from "express";
const route = Router();
import pool from "../connectDB.js";

const getAllSports = async(req,res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM sport");
        return res.status(200).json(rows);
    }
    catch(err){
        // console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
    
}

route.get("/",getAllSports);
export default route