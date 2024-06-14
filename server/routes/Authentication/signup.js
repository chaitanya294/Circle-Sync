const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../../model/model");
require("dotenv").config();
const {SECRET_KEY} = process.env;
const router = express.Router();

router.post('/', async (req, res) => {
    const user_obj = {
        "username" : req.body.username,
        "password" : req.body.password,
        "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "organization" : req.body.organization,
        "email_id" : req.body.email_id,
        "description" : "Enter your description"
    }
    user_obj.password =  await bcrypt.hash(user_obj.password, 4);
    const is_exist = await User.findOne({email_id : user_obj.email_id});
    if(is_exist){
        res.json({
            msg : "Email ID already exists",
        });
    }
    else{
        const response = new User(user_obj);
        await response.save();
        const token = jwt.sign({
            data : response._id,
        }, SECRET_KEY, { expiresIn : '7d'});
        res.cookie('token', token).json({
            msg : "Successfull signup"
        });
    }
});

module.exports = router;