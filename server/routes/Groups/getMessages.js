const express = require("express");
const { Group, Message } = require("../../model/model");
const router = express.Router();

router.post("/", async (req, res)=> {
    const grpId = req.body.grpId;
    const response = await Group.findOne({_id : grpId});
    const messagesId = response.messages;
    const allMessage = await Message.find({"_id" : {"$in" : messagesId}});
    res.json(allMessage);
})

module.exports = router;