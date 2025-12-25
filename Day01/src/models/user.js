const mongoose=require('mongoose');
const {Schema}=mongoose
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },

    lastName:{
        type:String,
        minLength:3,
        maxLength:20
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:Number,
        min:10,
        max:80,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
       required:true,
       type:String,
       minLength:6,
       maxLength:20
    },
    problemSolved:{
        type:[String]
    }
     

},{
    timestamps:true
});

const User=mongoose.model("user",userSchema);

module.exports=User;