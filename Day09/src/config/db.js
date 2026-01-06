const mongoose =require('mongoose')


async function main(){
   try {
      await mongoose.connect(process.env.DB_CONNECT_STRING)
      console.log("mongo connected")
   } catch (error) {
      console.log("error"+error.message)
   }
}

module.exports=main;