const jwt=require("jsonwebtoken")
const User=require("../models/user");
const redisClient=require("../config/redis")
const adminMiddleware=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token is Not present in adminMiddleware")
        }
       
       
        const payload= await jwt.verify(token,process.env.JWT_KEY);
        console.log("Token Payload:", payload);
        const {_id}=payload;
        if(!_id){
            throw new Error("id is missing in adminMiddleware")
        }
        const result=await User.findById(_id);
        if(payload.role!='admin'){
            throw new Error("Invalid token,Access denied:You are not an admin in adminMiddleware");
        }
        if(!result){
            throw new Error("User Doesn't exist in adminMiddleware");
        }
        
        const isBlocked=await redisClient.exists(`token:${token}`);
        if(isBlocked){
            throw new Error("Invalid Token in adminMiddleware");
        }
        req.result=result;
        next();
        
    } catch (error) {
        res.status(401).send("Error in adminMiddleware"+error.message);
    }
} 

module.exports=adminMiddleware