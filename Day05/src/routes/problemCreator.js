const express=require('express')
const problemRouter=express.Router();
const adminMiddleware = require('../Middleware/adminMiddleware');
const createProblem=require("../controllers/userProblem")

problemRouter.post("/create",adminMiddleware,createProblem);
// problemRouter.patch("/:id",updateProblem);
// problemRouter.delete("/:id",deleteProblem); 

// problemRouter.get("/:id",getProblemById);
// problemRouter.get("/",getAllProblem); 
// problemRouter.get("/user",solvedAllProblemByUser);

module.exports=problemRouter