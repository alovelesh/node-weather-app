const request = require('request');

const geocode = (address, cb) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibG92ZWFncmF3YWwiLCJhIjoiY2tqbDhybzByMjBzODJzbG82MDdhMXN0NCJ9.cIJZxHKApFJVeyyjE-8IdA&limit=1';
    request({ url, json: true }, (error, response) => {
        if (error) {
            cb('Unable to connect with mapbox service');
        } else {
            const data = response.body.features;
            if (!data.length) {
                cb('Unable to find location. Try another search!')
            } else {
                cb(undefined, {
                    latitude: data[0].center[1],
                    longitude: data[0].center[0],
                    location: data[0].place_name
                });
            }
        }
    })
}

module.exports = geocode;