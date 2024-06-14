const express = require("express");
const {Subjects} = require("../../model/model");
const router = express.Router();

router.post("/", async (req, res) => {
    const id = req.body.id;
    const response = await Subjects.findOneAndUpdate({"_id" : id}, {
        hr_spent : req.body.hr_spent,
        min_spent : req.body.min_spent,
        sec_spent : req.body.sec_spent
    });
    if(response){
        res.json({
            message : "ok"
        })
    }
    else{
        res.json({});
    }
});

router.put("/", async (req, res) => {
    const id = req.body.id;
    const subject_name = req.body.subject_name;
    const response = await Subjects.findOneAndUpdate({_id : id}, {
        subject_name : subject_name
    });
    if(response){
        res.json({
            message : "ok"
        });
    }
    else{
        res.json({});
    }
})


module.exports = router;