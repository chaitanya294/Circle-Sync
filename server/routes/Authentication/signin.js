const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {User} = require("../../model/model");
const cookieParser = require("cookie-parser");
const {SECRET_KEY} = process.env;
const router = express.Router();

router.use(cookieParser());

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const user_obj = await User.findOne({"username" : username});
    if(user_obj){
        const result = await bcrypt.compare(password, user_obj.password);
        if(result == true){
            const token = jwt.sign({ _id : user_obj._id }, SECRET_KEY, { expiresIn: '7d'});
            res.json({'token': token});
        }
        else{
            res.json({
                "msg" : "Incorrect Password", 
            })
        }
    }
    else{
        res.json({
            "msg" : "User does not exist",
        })
    }
});

module.exports = router;