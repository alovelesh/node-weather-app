const path = require('path')
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lovelesh Agrawal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Lovelesh Agrawal'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lovelesh Agrawal',
        heplText: 'This is help text.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address!'
        })
    }
    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({error});
        }
        forecast(response.latitude, response.longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location: response.location,
                address: req.query.address
            });
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-not-found', {
        title: '404',
        name: 'Lovelesh Agrawal',
        error: 'Help Page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404-not-found', {
        title: '404',
        name: 'Lovelesh Agrawal',
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is listening on port 3000')
})