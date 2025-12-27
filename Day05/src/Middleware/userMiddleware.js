const jwt=require("jsonwebtoken")
const User=require("../models/user");
const redisClient=require("../config/redis")
const userMiddleware=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token is Not present")
        }
       
       
        const payload= await jwt.verify(token,process.env.JWT_KEY);
        const {_id}=payload;
        if(!_id){
            throw new Error("id is missing")
        }
        const result=await User.findById(_id);
        if(!result){
            throw new Error("User Doesn't exist");
        }
        
        const isBlocked=await redisClient.exists(`token:${token}`);
        if(isBlocked){
            throw new Error("Invalid Token");
        }
        req.result=result;
        next();
        
    } catch (error) {
        res.status(401).send("Error"+Error.message);
    }
} 

module.exports=userMiddleware