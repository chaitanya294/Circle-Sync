const express = require("express");
const { User, Group } = require("../../model/model");
const router = express.Router();

router.post("/", async (req, res) => {
    const {user_id, grp_id} = req.body;
    try{
        const grp = await Group.findOne({"_id" : grp_id});
        if(grp.members == grp.maxMembers) {
            res.json({
                "msg" : "Error occured"
            })
        }
        await Group.findOneAndUpdate({_id : grp_id}, {"$push" : {"grpMembers" : user_id}});
        await Group.findOneAndUpdate({_id : grp_id}, {"members" : grp.members+1});
        await User.findOneAndUpdate({_id : user_id}, {"$push" : {"groups" : grp_id}});
        res.json({});
    }
    catch {
        res.json({
            "msg" : "Error occured"
        })
    }
})


module.exports = router;