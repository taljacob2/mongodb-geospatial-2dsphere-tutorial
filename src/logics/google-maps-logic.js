const axios = require('axios');


/**
 * Query Google Geocoding API to get latitude&longitude from address
 *
 * Usage Example:
 *  geocodingQuery('1 place du Capitole, Toulouse');
 *
 * @param {string} address full address, may be seperated by spaces
 */
const geocodingQuery = async (address) => {
    const geocoderQuery = encodeURIComponent(`${address}`.replace(/ /g, '+'));
    const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${geocoderQuery}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    // return result.data;
    const lat = result.data.results['0'].geometry.location.lat;
    const lng = result.data.results['0'].geometry.location.lng;
    return { lat, lng };
}


module.exports = { geocodingQuery };
