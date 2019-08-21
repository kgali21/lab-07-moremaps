//load environment variables from .env
require('dotenv').config();

//application dependecies
const express = require('express');
const cors = require('cors');

//application setup
//make express api
const app = express();

//get port on which to run app
const PORT = process.env.PORT;

//enable cors
app.use(cors());

//API routes
app.get('/location', (request, response) => {
    try {
        //use express built-in query object
        const location = request.query.location;
        const result = getLatLng(location);
        response.status(200).json(result);
    }
    catch(err) {
        response.status(500).send('Sorry, something went wrong please try again.');
    }
});

const geoData = require('./data/geo.json');

function getLatLng(/*placeholder for api*/) {
    //api call will go here
    return toLocation(geoData);
}

function toLocation(geoData) {
    const firstResponse = geoData.results[0];
    const geometry = firstResponse.geometry;
    return {
        formatted_query: firstResponse.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}

app.get('/weather', (request, response) => {
    try {
        const weather = request.query.weather;
        const result = getWeather(weather);
        response.status(200).json(result);
    }
    catch(err) {
        response.status(500).send('Oops, something went wrong please try again.');
    }
});

const weather = require('./data/darksky.json');

function getWeather(/*weather*/) {
    //api call will go here
    return toWeather(weather);
}

function toWeather(weather) {
    const pathToData = weather.daily.data;
    let dataArray = [];
    for(let i = 0; i < pathToData.length; i++) {
        let dataObject = {
            forecast: pathToData[i].summary,
            time: pathToData[i].time
        };
        dataArray.push(dataObject);
    }
    return dataArray;
}

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});