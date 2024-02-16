const express=require('express');

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userAuth=require('../middleware/userAuth');


const userController=require("../controllers/userController");
const {login,signup}=userController;
const router=express.Router();
console.log("test2:");
router.post('/signup',userAuth.saveUser,signup);
router.post('/login',login);
module.exports=router;