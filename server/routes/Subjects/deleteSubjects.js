const express = require("express");
const router = express.Router();
const {Subjects} = require("../../model/model");

router.post("/", async(req, res) => {
    const id = req.body.id;
    const response = await Subjects.deleteOne({_id : id});
    res.json({});
});

module.exports = router;