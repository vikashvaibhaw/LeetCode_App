const express=require('express')

const authRouter=express.Router();

const {register,login,logout,adminRegister}=require('../controllers/userAuthent');
const userMiddleware = require('../Middleware/userMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
authRouter.post('/admin/register',adminMiddleware,adminRegister);
// authRouter.get('getProfile',getProfile); 


module.exports=authRouter;