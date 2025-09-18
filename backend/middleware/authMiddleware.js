import jwt from 'jsonwebtoken';

export const verifyJWTToken = (req,res,next) =>{
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({success:false,message:"No token provided"});
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err) return res.status(401).json({success:false,message:"Invalid token"});
        req.user = decoded;
        next();
    })
}