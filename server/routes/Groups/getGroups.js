const express = require("express");
const {Group, User} = require("../../model/model");
const router = express.Router();

router.get('/:_id', async (req, res) => {
    const response = await Group.find({});
    let grps = [];
    for(let i = 0; i<response.length; i++){
        let canAdd = true;
        for(let j = 0; j < response[i].grpMembers.length; j++){
            if(response[i].grpMembers[j] == req.params['_id']){
                canAdd = false;
                break;
            }
        }
        if(canAdd){
            grps.push(response[i]);
        }
    }
    res.json(grps);
})


router.post('/', async (req, res) => {
    const _id = req.body._id;
    const data = await User.findOne({"_id" : _id});
    const grps = data.groups;
    if(grps.length) {
        const userGrps = await Group.find({_id : { $in : grps}});
        res.json(userGrps);
    }
    else{
        res.json({
            "msg" : "No groups joined"
        })
    }
})

module.exports = router;