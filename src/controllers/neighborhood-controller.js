const express = require("express");
const router = express.Router();
const StatusCode = require('status-code-enum').StatusCode
const neighborhoodLogic = require('../logics/neighborhood-logic');


router.get("/", async (req, res, next) => {
    try {
        const neighborhoods = await neighborhoodLogic.getAllRestaurantsAsync();
        res.json(neighborhoods);
    } catch (error) {
        next(error);
    }
});


module.exports = router;