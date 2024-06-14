const express = require("express");
const middleware = require("../../middlewares/middleware");
const router = express.Router();

router.post("/", middleware, (req, res) => {
    res.json({
        _id : req.headers._id,
    });
});

module.exports = router;