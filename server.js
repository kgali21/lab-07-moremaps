//load environment variables from .env
require('dotenv').config();

//application dependecies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//api service dependencies
const mapApi = require('./lib/map-api');
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