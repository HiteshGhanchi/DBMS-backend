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
    if(!email){
        return res.status(400).json({emailError:"Please enter email"});
    }

    if(!password){
        return res.status(400).json({passwordError:"Please enter password"});
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?",[email]);

    if(rows.length < 1){
        return res.status(400).json({emailError:"No such user exists"});
    }

    const hashPassword = rows[0].password;
    const validPassword = await bcrypt.compare(password,hashPassword);

    if(!validPassword){
        return res.status(400).json({passwordError:"Invalid password"});
    }

    const token = createAccessToken({email:rows[0].email,name:rows[0].name,phone:rows[0].phone});
    return res.status(200).json({message:"Login successful",token});

}

const userRegister = async(req,res) =>{
    const {email,password,name,phone} = req.body;

    if(!email)
        return res.status(400).json({emailError:"Please enter email"});
    
    if(!password)
        return res.status(400).json({passwordError:"Please enter password"});

    if(!name)
        return res.status(400).json({nameError:"Please enter name"});

    if(!phone)
        return res.status(400).json({phoneError:"Please enter phone"});
    

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?",[email]);

    if(rows.length > 0){
        return res.status(400).json({emailError:"User already exists"})
    }
    const hashPassword = await hashpassword(password);

    const [result] = await pool.query("INSERT INTO users (email,password,name,phone) VALUES (?,?,?,?)",[email,hashPassword,name,phone]);
    if(result.affectedRows > 0){
        return userLogin(req,res);
    }

    return res.status(500).json({message:"Something went wrong"})
}

export {userRegister, userLogin};
