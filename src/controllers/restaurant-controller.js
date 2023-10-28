const express = require("express");
const router = express.Router();
const StatusCode = require('status-code-enum').StatusCode;
const restaurantLogic = require('../logics/restaurant-logic');


router.get("/", async (req, res, next) => {
    try {
        const restaurants = await restaurantLogic.getAllRestaurantsAsync();
        res.json(restaurants);
    } catch (error) {
        next(error);
    }
});


module.exports = router;