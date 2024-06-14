const jwt = require("jsonwebtoken");
require("dotenv").config();
const {SECRET_KEY} = process.env;

async function middleware (req, res, next) {
    try{
        const data = jwt.verify(req.body.token, process.env.SECRET_KEY);
        req.headers._id = data._id;
        next();
    }
    catch {
        res.json({
            "error" : "Invalid Token",
        })
    }
}

module.exports = middleware;