const request = require('superagent');

const BASE_URL = 'https://api.darksky.net/forecast';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

module.exports = {
    getWeather(lat, lng) {
        const url = `${BASE_URL}/${WEATHER_API_KEY}/${lat},${lng}`;
        return request
            .get(url)
            .then(res => {
                return toWeather(res.body);
            });
    }
};

function toWeather(weather) {
    const pathToData = weather.daily.data;
    let dataArray = [];
    pathToData.map(data => {
        let dataObject = {
            forecast: data.summary,
            time: new Date(data.time * 1000).toISOString()
        };
        dataArray.push(dataObject);
    });
    return dataArray;
}
