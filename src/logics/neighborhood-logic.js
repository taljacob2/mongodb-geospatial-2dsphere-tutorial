const NeighborhoodModel = require('../models/neighborhood')


const getAllNeighborhoodsAsync = async () => {    
    return await NeighborhoodModel.find().exec();    
}


module.exports = { getAllNeighborhoodsAsync };
