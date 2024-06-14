const express = require("express");
const { User, Group } = require("../../model/model");
const router = express.Router();

router.post("/", async (req, res)=> {
    const {_id, grpId} = req.body;
    const response = await User.findOne({"_id" : _id});
    const grpResponse = await Group.findOne({"_id" : grpId});
    let newUserGrp = [];
    let newGrpUser = [];
    for(let i = 0; i<response.groups.length; i++){
        if(response.groups[i] != grpId){
            newUserGrp.push(response.groups[i]);
        }
    }
    for(let i = 0; i<grpResponse.grpMembers.length; i++){
        if(grpResponse.grpMembers[i] != _id){
            newGrpUser.push(grpResponse.grpMembers[i]);
        }
    }
    await User.findOneAndUpdate({"_id" : _id}, {"groups" : newUserGrp});
    await Group.findOneAndUpdate({"_id" : grpId}, {"grpMembers" : newGrpUser, "members" : grpResponse.members-1});
    res.json({});
});

module.exports = router;