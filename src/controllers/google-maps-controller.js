const express = require("express");
const router = express.Router();
const StatusCode = require('status-code-enum').StatusCode
const googleMapsLogic = require('../logics/google-maps-logic');


router.get("/search/:name", async (req, res, next) => {
    try {
        const { name } = req.params;
        const result = await googleMapsLogic.geocodingQuery(name);
        res.json(result);
    } catch (error) {
        next(error);
    }
});


module.exports = router;