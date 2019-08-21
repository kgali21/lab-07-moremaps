const request = require('superagent');

const BASE_URL = 'https://www.eventbriteapi.com/v3/events/search';
const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;

module.exports = {
    getEvents(lat, lng) {
        const url = `${BASE_URL}/?token=${EVENTBRITE_API_KEY}&location.latitude=${lat}&location.longitude=${lng}`;
        console.log(url);
        return request
            .get(url)
            .then(res => {
                return toEvents(res.body);
            });
    }
};

function toEvents(response) {
    const data = response.events;
    let eventArray = data.map(formatEvent);
    return eventArray.slice(0, 20);
}

function formatEvent(event) {
    return {
        link: event.url,
        name: event.name.text,
        event_date: event.start.local,
        summary: event.summary
    };
}