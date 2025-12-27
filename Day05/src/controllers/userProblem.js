const Problem = require("../models/problem.js");
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

module.exports=createProblem