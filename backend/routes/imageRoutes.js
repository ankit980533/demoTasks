const express=require('express');
const imageController=require('../controllers/imageController');
const{upload,imageUpload}=imageController;
const router=express.Router();
const verifyToken=require("../middleware/authMiddleware");

router.post('/imageUpload',verifyToken,upload.any(),imageUpload);
module.exports=router;
