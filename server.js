//load environment variables from .env
require('dotenv').config();

//application dependecies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//api service dependencies
const mapApi = require('./lib/map-api');
const weatherApi = require('./lib/weather-api');
const eventsApi = require('./lib/events-api');
//application setup

const app = express();

//get port on which to run app
const PORT = process.env.PORT;

//enable cors
app.use(morgan('dev'));
app.use(cors());

//API routes
app.get('/location', (request, response) => {
    const search = request.query.search;
    mapApi.getLocation(search)
        .then(location => {
            response.json(location);
        })
        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });

});

app.get('/weather', (request, response) => {
    const lat = request.query.latitude;
    const lng = request.query.longitude;

    weatherApi.getWeather(lat, lng)
        .then(forecast => {
            response.json(forecast);
        })
        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });
});

app.get('/events', (request, response) => {
    const lat = request.query.latitude;
    const lng = request.query.longitude;

    eventsApi.getEvents(lat, lng)
        .then(event => {
            response.json(event);
        })
        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });
});
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});