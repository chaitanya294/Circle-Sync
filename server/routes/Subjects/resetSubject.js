const express = require("express");
const { User, Subjects } = require("../../model/model");
const router = express.Router();

router.post("/", async(req, res)=> {
    const data = await User.findOne({"_id" : req.body._id});
    const allSubjects = await Subjects.find({"_id" : {"$in" : data.subjects}});
    for(let i = 0; i<allSubjects.length; i++){
        await Subjects.findOneAndUpdate({"_id" : allSubjects[i]._id},{"hr_spent" : "00", "min_spent" : "00", "sec_spent" : "00"})
    }
    res.json({});
})

module.exports = router;