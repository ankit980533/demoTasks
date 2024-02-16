const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const image = require('../models/imageModels')
var dir = "./uploads";
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            callback( null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: function (req, file, callback) {
        console.log("testingf"+path.extname(file.originalname));
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(/*res.end('Only images are allowed')*/ null, false)
        }
        callback(null, true)
    }
});
const imageUpload = async (req, res) => {
    try {
        if (req.files && req.body && req.body.name) {
            let newimage = new image();
            newimage.name = req.body.name;
            newimage.image = req.files[0].filename;
            // newimage.save((err, data) => {
            //     if (err) {
            //         res.status(400).json({
            //             errorMessage: err,
            //             status: false
            //         });
            //     } else {
            //         res.status(200).json({
            //             status: true,
            //             title: 'image Added successfully.'
            //         });
            //     }
            // })
            newimage.save()
            .then(
                res.status(200).json({
                                status: true,
                                title: 'image Added successfully.'
                            })
            )
            .catch(error => {
                console.error("Error saving user:", error);
                return res.status(500).send("Error saving user");
            });

        }
        else {
            res.status(400).json({
              errorMessage: 'Add proper parameter first!',
              status: false
            });
          }
        
    } catch (error) {
        res.status(400).json({
            errorMessage: 'something went wrong!',
            status: false
          });
    }


}
module.exports={
    upload,imageUpload
}