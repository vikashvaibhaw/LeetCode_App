const express=require('express')
const path = require("path");
require ("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app=express();


const mongoose = require("mongoose");

const main=require('./config/db')
const cookieParser=require('cookie-parser')
const authRouter=require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter=require("./routes/problemCreator");


app.use(express.json());
app.use(cookieParser())
app.use('/user',authRouter);
app.use('/problem',problemRouter);

const InitializeConnection=async()=>{
   try {
      await Promise.all([main(),redisClient.connect()]);
      console.log("DB CONNECTED ");
      app.listen(process.env.PORT,()=>{
          console.log("Server listening at port number :"+process.env.PORT);
      })
   } catch (error) {
      console.log(error);
   }
}

InitializeConnection();