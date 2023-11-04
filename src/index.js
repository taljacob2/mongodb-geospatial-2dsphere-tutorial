const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const restaurantController = require('./controllers/restaurant-controller');
const neighborhoodController = require('./controllers/neighborhood-controller');
const googleMapsController = require('./controllers/google-maps-controller');
const errorHandler = require('./middlewares/error-handler');
const createPublicRoute = require('./helpers/public/create-public-route');
const connectAsync = require('./data-access/dal');


// Configure environment variables.
dotenvExpand.expand(dotenv.config());

const app = express();
const PORT = process.env.NODE_PORT;
app.use(cors());
app.use(express.json());

app.use('/api/restaurant', restaurantController);
app.use('/api/neighborhood', neighborhoodController);
app.use('/api/maps', googleMapsController);
createPublicRoute(app);
app.use(errorHandler);

app.listen(PORT, async () => {
    await connectAsync();
    console.log(`App listening on port ${PORT}...`);
})
