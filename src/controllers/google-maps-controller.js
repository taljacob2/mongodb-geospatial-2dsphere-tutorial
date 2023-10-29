const express = require("express");
const router = express.Router();
const StatusCode = require('status-code-enum').StatusCode
const googleMapsLogic = require('../logics/google-maps-logic');


router.get("/search", async (req, res, next) => {
    try {
        const result = await googleMapsLogic.geocodingQuery('1 place du Capitole', 'Toulouse');
        res.json(result);
    } catch (error) {
        next(error);
    }
});


module.exports = router;