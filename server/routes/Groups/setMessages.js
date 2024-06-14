const express = require("express");
const { Message, Group, User } = require("../../model/model");
const router = express.Router();

router.post("/", async (req, res)=> {
    const {grpId, userId, content} = req.body;
    const user = await User.findOne({"_id" : userId});
    const response = await Message.create({
        "content" : content,
        "senderId" : userId,
        "grpId" : grpId,
        "username" : user.username
    });
    await Group.findOneAndUpdate({"_id" : grpId}, {"$push" : {"messages" : response._id}});
    res.json(response);
})

module.exports = router;