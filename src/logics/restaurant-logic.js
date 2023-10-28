const RestaurantModel = require('../models/restaurant')


const getAllRestaurantsAsync = async () => {    
    return await RestaurantModel.find().exec();    
}


module.exports = { getAllRestaurantsAsync };
