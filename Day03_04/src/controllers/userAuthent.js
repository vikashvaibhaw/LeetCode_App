const redisClient = require("../config/redis");
const User=require("../models/user")
const validate=require("../utils/validator");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');

const register=async(req,res)=>{
    try {
        validate(req.body);
        const {firstName,emailId,password}=req.body;
        req.body.password=await bcrypt.hash(password,10);
        req.body.role='user'

        const user=await User.create(req.body);
        const token=jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_KEY,{expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(201).send("User Registered Successfully")

    } catch (error) {
        res.status(400).send("Error: "+error.message)
    }
}

const login=async(req,res)=>{
    try {
        const {emailId,password}=req.body;

        if(!emailId){
            throw new Error("Invalid Credentials");
        }
        if(!password){
            throw new Error("Invalid Credentials")
        }

        const user=await User.findOne({emailId});

        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const match=await bcrypt.compare(password,user.password);
        if(!match){
           throw new Error("Invalid Credentials")
        }

        const token=jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_KEY,{expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(200).send("Logged-In Successfully")

    } catch (error) {
        res.status(401).send("Error: "+error)
    }
}

const logout=async(req,res)=>{

    try {
        const {token}=req.cookies;
        const payload=jwt.verify(token,process.env.JWT_KEY);
        await redisClient.set(`token:${token}`,'Blocked')
        await redisClient.expireAt(`token:${token}`,payload.exp)
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("Logout Successfully");
    } catch (error) {
        res.status(401).send("Error:"+error);
    }
}

const adminRegister=async(req,res)=>{
     try{
        validate(req.body);
        const {firstName,emailId,password}=req.body;
        req.body.password=await bcrypt.hash(password,10);
        // req.body.role='admin'

        const user=await User.create(req.body);
        const token=jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_KEY,{expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(201).send("Admin Registered Successfully")

    } catch (error) {
        res.status(400).send("Error: "+error.message)
    }
} 

module.exports={register,login,logout,adminRegister};