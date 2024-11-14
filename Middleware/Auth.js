import jwt from 'jsonwebtoken';

export const Auth = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token)
            res.status(401).json({message:"Access Denied: No Token Provided"});
    try{
        
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch(err){
        res.status(401).json({message:"Access Denied: Invalid Token"});
    }
}