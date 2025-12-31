const Problem=require("../models/problem")
const Submission=require("../models/submission")
const {submitBatch,getLanguageById,submitToken}=require("../utils/problemUtility")

const submitCode=async(req,res)=>{
    
   try {
    
      const userId=req.result._id;
      const problemId=req.params.id

      const {code,language}=req.body

      if(!userId || !problemId || !language || !code){
        return res.status(400).send("some field is missing")
      }
      
      const problem=await Problem.findById(problemId)
      const submittedResult  =await Submission.create({
         userId,
         problemId,
         code,
         language,
         status:'pending',
         testCasesTotal:problem.hiddenTestCases.length
      })
      
      const languageId=getLanguageById(language);
       
      const submissions=problem.hiddenTestCases.map((testcase)=>({
                source_code:code,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
      }));

      const submitResult=await submitBatch(submissions)

      const resultToken=submitResult.map((value)=>value.token);
      
      const testResult= await submitToken(resultToken);
      let testCasesPassed=0;
      let runtime=0;
      let memory=0;
      let status='accepted'
      let errorMessage=null;

      for(const test of testResult){
         if(test.status_id==3){
            testCasesPassed++;
            runtime=runtime+parseFloat(test.time);
            memory=Math.max(memory,test.memory);

         }
         else{
            if(test.status_id==4){
               status='error'
               errorMessage=test.stderr
            }
            else{
               status='wrong'
               errorMessage=test.stderr
            }
         }
      }

      submittedResult.status=status
      submittedResult.testCasesPassed=testCasesPassed
      submittedResult.errorMessage=errorMessage
      submittedResult.runtime=runtime
      submittedResult.memory=memory

      await submittedResult.save();
      
      res.status(201).send(submittedResult)

      
   } catch (error) {
       res.status(500).send("internal server error "+error)
   }

}

module.exports=submitCode