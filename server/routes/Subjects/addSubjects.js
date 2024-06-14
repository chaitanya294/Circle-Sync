const express = require("express");
const { User, Subjects } = require("../../model/model");
const router = express.Router();

router.post("/", async (req, res) => {
    const subject_name = req.body.subject_name;
    const user_id = req.body.user_id;
    const response = await Subjects.create( { subject_name : subject_name });
    const user = await User.findOne({_id : user_id});
    const update = {subjects : [...user.subjects, response._id]};
    const response_user = await User.findOneAndUpdate({_id : user_id}, update);
    res.json({
        msg : response_user
    });
});

module.exports = router;