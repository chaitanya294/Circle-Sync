const express = require("express");
const router = express.Router();
const {Group, User} = require("../../model/model");


router.post("/", async (req, res) => {
    const data = req.body;
    const leader = await User.findOne({_id : data.leader});
    const leaderName = leader.firstName + " " + leader.lastName;
    const response = await Group.create({
        grpName : data.grpName,
        goal : data.goal,
        maxMembers : data.maxMembers,
        leader : leaderName,
        attendence : data.attendence,
        description : data.description
    });
    await Group.findOneAndUpdate({_id : response._id}, {"$push" : {"grpMembers" : data.leader}});
    await User.findOneAndUpdate({_id : req.body.leader}, {"$push": { "groups": response._id }});
    res.json(response);
});

module.exports = router;