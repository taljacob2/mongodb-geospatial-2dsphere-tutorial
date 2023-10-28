const express = require("express");
const router = express.Router();
const StatusCode = require('status-code-enum').StatusCode


router.get("/", async (req, res, next) => {
    try {
        res.send("all neighborhoods");
    } catch (error) {
        next(error);
    }
});


module.exports = router;