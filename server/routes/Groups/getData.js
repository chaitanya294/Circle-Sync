const express = require("express");
const { User, Group } = require("../../model/model");
const router = express.Router();

router.get("/", async (req, res) => {
    const user_id = req.query["user_id"];
    const grp_id = req.query["grp_id"];
    const response_user = await User.findOne({_id : user_id});
    const response_grp = await Group.findOne({_id : grp_id});
    const response = [response_user, response_grp];
    res.json(response);
});

router.post("/", async (req, res) => {
    const user_id = req.body.user_id;
    const response = await User.findOne({"_id" : user_id});
    res.json(response);
})

module.exports = router;