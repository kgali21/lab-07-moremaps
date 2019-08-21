const request = require('superagent');

// url and keys
const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

module.exports = {
    getLocation(search) {
        return request
            .get(BASE_URL)
            .query({ address: search })
            .query({ key: GEOCODE_API_KEY })
            .then(result => {
                return toLocation(result.body, search);

            });
    }
};


function toLocation(geoData, search) {
    const firstResponse = geoData.results[0];
    const geometry = firstResponse.geometry;
    return {
        search_query: search,
        formatted_query: firstResponse.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}