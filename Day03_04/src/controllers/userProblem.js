const {getLanguageById,submitBatch}=require("../utils/problemUtility.js")

const createProblem=async(req,res)=>{
    const {title,description,difficulty,tags,visibleTestCases,hiddenTestCases,startCode,referenceSolution,problemCreator}=req.body;
    try {
        for(const {language,completeCode} of referenceSolution){
            //source code
            //lang id
            //input
            //expected output

            const languageId=getLanguageById(language);
            const submissions=visibleTestCases.map((input,output)=>({
                source_code:completeCode,
                language_id:languageId,
                stdin:input,
                expected_output:output
            }));

           const submitResult=await submitBatch(submissions)
            
        }
    } catch (error) {
        
    }


}

submissions:[
    {
      "language_id": 46,
      "source_code": "echo hello from Bash",
      stdin:23,
      expected_output:43
    },
    {
      "language_id": 71,
      "source_code": "print(\"hello from Python\")"
    },
    {
      "language_id": 72,
      "source_code": "puts(\"hello from Ruby\")"
    }
]