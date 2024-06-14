const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/', async (req, res) => {
    const decoded = await jwt.verify(req.body.token, SECRET_KEY);
    if(decoded){
        res.json({
            msg : "Valid JWT sent",
        })
    }
    else{
        res.json({
            msg : "Invalid token",
        })
    }
});

module.exports = router;