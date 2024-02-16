const express= require('express');

const User=require("../models/userModels")
const saveUser = async (req, res, next) => {
    //search the database to see if user exist
    try {
     
   
    
      const emailcheck = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
   
      
      if (emailcheck) {
        return res.json(409).send("Authentication failed");
      }
      console.log("hduhwu");
   
      next();
    } catch (error) {
      console.log(error);
    }
   };
   
   //exporting module
    module.exports = {
    saveUser,
   };