const express = require("express");
const path = require('path');
const createEnvFileForPublicFolder = require('./create-env-file-for-public-folder');


const createPublicRoute = (app) => {
    createEnvFileForPublicFolder();

    // Route to "public" directory.
    app.use(express.static('public'), express.static(path.join(`${__dirname}/../..`, 'public')));

    // Define main router. Main page.
    app.get('/', (req, res) => {
        res.sendFile('../../public/index.html', { root: `${__dirname}/../..` });
    });
};


module.exports = createPublicRoute;
