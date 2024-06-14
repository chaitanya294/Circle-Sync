const express = require("express");
const {User, Subjects} = require("../../model/model");
const router = express.Router();

router.post("/", async (req, res) => {
    const user_id = req.body.user_id;
    const response = await User.findOne({_id : user_id});
    const subjects = response.subjects;
    const response_sub = await Subjects.find({_id : { "$in" : subjects}});
    res.json({
        "message" : response_sub
    })
});

module.exports = router;