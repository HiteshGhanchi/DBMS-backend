import pool from "../connectDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const hashpassword = async(password) =>{
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS,10));
    return await bcrypt.hash(password,salt);
}

const createAccessToken = (payload) =>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1h"});
}

const userLogin = async(req,res) =>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Please enter all the fields"});
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?",[email]);

    if(rows.length < 1){
        return res.status(400).json({message:"User does not exist"});
    }

    const hashPassword = rows[0].password;
    const validPassword = await bcrypt.compare(password,hashPassword);

    if(!validPassword){
        return res.status(400).json({message:"Invalid password"});
    }

    const token = createAccessToken({email:rows[0].email,name:rows[0].name,phone:rows[0].phone});
    return res.status(200).json({message:"Login successful",token});

}

const userRegister = async(req,res) =>{
    const {email,password,name,phone} = req.body;

    if(!email || !password || !name || !phone){
        return res.status(400).json({message:"Please enter all the fields"})
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?",[email]);

    if(rows.length > 0){
        return res.status(400).json({message:"User already exists"})
    }
    const hashPassword = await hashpassword(password);

    const [result] = await pool.query("INSERT INTO users (email,password,name,phone) VALUES (?,?,?,?)",[email,hashPassword,name,phone]);
    if(result.affectedRows > 0){
        return userLogin(req,res);
    }

    return res.status(500).json({message:"Something went wrong"})
}

export {userRegister, userLogin};
