const axios = require('axios');


/**
 * Query Google Geocoding API to get latitude&longitude from address
 *
 * Usage Example:
 *  geocodingQuery('1 place du Capitole', 'Toulouse');
 *
 * @param {string} address street address in the city
 * @param {string} city city
 */
const geocodingQuery = async (address, city) => {
    const geocoderQuery = encodeURIComponent(`${address} ${city}`.replace(/ /g, '+'));
    const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${geocoderQuery}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    // return result.data;
    const lat = result.data.results['0'].geometry.location.lat;
    const lng = result.data.results['0'].geometry.location.lng;
    return { lat, lng };
}


module.exports = { geocodingQuery };
