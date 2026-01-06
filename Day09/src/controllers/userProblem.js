const Problem = require("../models/problem.js");
const User = require("../models/user.js");
const Submission=require("../models/submission.js")
const {getLanguageById,submitBatch,submitToken}=require("../utils/problemUtility.js")

const createProblem=async(req,res)=>{
    const {title,description,difficulty,tags,visibleTestCases,hiddenTestCases,startCode,referenceSolution,problemCreator}=req.body;
    try {
        for(const {language,completeCode} of referenceSolution){
            //source code
            //lang id
            //input
            //expected output

            const languageId=getLanguageById(language);
            const submissions=visibleTestCases.map((testcase)=>({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            }));

           const submitResult=await submitBatch(submissions)
           console.log(submitResult);
            
           const resultToken=submitResult.map((value)=>value.token);
           console.log(resultToken);
           const testResult= await submitToken(resultToken);
           console.log(testResult);

           for(const test of testResult){
              if(test.status_id!=3){
                return res.status(400).send("Error Occured in userproblem testResult");
              }
           }



        }

        //we can store it in our DB

          const userProblem= await Problem.create({
              ...req.body,
              problemCreator:req.result._id
           });

           res.status(201).send("Problem Saved Successfully");

    } catch (error) {
        res.status(400).send("Error occured  in userProblem catch section:"+error);
    }


}

const updateProblem=async(req,res)=>{

    const {title,description,difficulty,tags,visibleTestCases,hiddenTestCases,startCode,referenceSolution,problemCreator}=req.body;
    const {id}= req.params;

    try {

        if(!id){
           return res.status(400).send("Invalid Problem Id, Missing Id, userProblem->update")
        }
        
        const dsaProblem =await Problem.findById(id);
        if(!dsaProblem){
            return res.status(400).send("Id is not present in server");
        }

       for(const {language,completeCode} of referenceSolution){
            //source code
            //lang id
            //input
            //expected output

            const languageId=getLanguageById(language);
            const submissions=visibleTestCases.map((testcase)=>({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            }));

           const submitResult=await submitBatch(submissions)
           console.log(submitResult);
            
           const resultToken=submitResult.map((value)=>value.token);
           console.log(resultToken);
           const testResult= await submitToken(resultToken);
           console.log(testResult);

           for(const test of testResult){
              if(test.status_id!=3){
                return res.status(400).send("Error Occured in userproblem testResult");
              }
           }
       }
       

       const newProblem=await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});

       res.status(200).send(newProblem);
    } catch (error) {
        res.status(500).send("error in userProblem ..update field "+error)
    }
}

const deleteProblem=async(req,res)=>{
    const {id}=req.params;
    try {
        
        if(!id){
            return res.status(400).send("ID is missing in deleteProblem")
        }
        
        const deletedProblem=await Problem.findByIdAndDelete(id);

        if(!deletedProblem){
            return res.status(404).send("Problem is missing")
        }
        
        res.status(200).send("successfully deleted");
    } catch (error) {
      res.status(500).send("Error in deleteProblem "+error)
    }
}

const getProblemById=async(req,res)=>{
    const {id}=req.params;
    try {
        
        if(!id){
            return res.status(400).send("id is missing....error in getProblem..id")
        }

        const getProblem=await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution');
        if(!getProblem){
            return res.status(400).send("id is missing..problem not exist..error in getProblem..id..db search")
        }

        return res.status(200).send(getProblem);

    } catch (error) {
        res.status(500).send("error in catch...getProblemById "+error);
    }
}

const getAllProblem=async(req,res)=>{
    try {

        const getProblem=await Problem.find({}).select('_id title tags difficulty');
        if(getProblem.length==0){
            return res.status(400).send("problem is missing..problem not exist..error in getAllProblem....db search")
        }

        return res.status(200).send(getProblem);

    } catch (error) {
        res.status(500).send("error in catch...getAllProblem "+error);
    }
}

const solvedAllProblemByUser=async(req,res)=>{
    
    try {
        
        const userId=req.result._id;

        const user=await User.findById(userId).populate({
            path:"problemSolved",
            select:"_id title difficulty tags"
        });

        res.status(200).send(user.problemSolved);

    } catch (error) {
        res.status(500).send("server error")
    }
}

const submittedProblem=async(req,res)=>{
   
    try {
        const userId=req.result._id;
        const problemId=req.params.pid;

        const ans= await Submission.find({userId,problemId});
        
        if(ans.length()==0){
            res.status(200).send("No submission is present")
        }

        res.status(200).send(ans);

    } catch (error) {
        res.status(500).send("internal server error")
    }

}

module.exports={createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblemByUser,submittedProblem}