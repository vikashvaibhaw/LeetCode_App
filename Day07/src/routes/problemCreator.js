const express=require('express')
const problemRouter=express.Router();
const adminMiddleware = require('../Middleware/adminMiddleware');
const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem}=require("../controllers/userProblem");
const userMiddleware = require('../Middleware/userMiddleware');

problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.put("/update/:id",adminMiddleware,updateProblem);
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem); 

problemRouter.get("/getAllProblem",userMiddleware,getAllProblem); 
problemRouter.get("/problemById/:id",userMiddleware,getProblemById);

// problemRouter.get("/problemSolvedByUser",userMiddleware,solvedAllProblemByUser);

module.exports=problemRouter