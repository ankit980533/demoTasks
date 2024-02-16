const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/userModels");
const signup = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json("Email already registered");
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            newUser.save()
                .then(user1 => {
                    let token = jwt.sign({ id: newUser.id }, "serree", {
                        expiresIn: 1 * 24 * 60 * 60 * 1000,
                    });

                    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
                    console.log("user", JSON.stringify(user1, null, 2));
                    console.log(token);
                    // Send user details
                    console.log("token");
                    return res.status(201).send(user1);
                })
                .catch(error => {
                    console.error("Error saving user:", error);
                    return res.status(500).send("Error saving user");
                });
        }
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json(error);
    }
};
const login = async (req, res) => {
    
    try {
        const { email, password } = req.body;
        console.log("hello this is test");
        //find a user by their email
        const user = await User.findOne({
           
                email: req.body.email
            

            

        });
        {console.log(user+"hii "+req.body.email);}
        if (user) {
            const isSame = await bcrypt.compare(req.body.password, user.password);

            

            if (isSame) {
                let token = jwt.sign({ id: user.id }, "sereee", {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                //send user data
                return res.status(201).send(token);
            } else {
               
                return res.status(401).send("hiii Authentication failed");
            }
        } else {
            console.log("hiiiiii")
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signup,
    login,
};
