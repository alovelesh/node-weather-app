const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?units=f&access_key=c0d7f8dd5f736610c30f84cceae25fb9&query='+ lat + ','+ long;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect with weather service!')
        } else {
            const data = response.body.current;
            callback(undefined, `${data.weather_descriptions}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`);
        }
    })
}

module.exports = forecast;