const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { emitWarning } = require('process')
const geoLocation = require('./utils/geocode')
const foreCast = require('./utils/weatherForecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
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
        title : 'Weather',
        name : 'Noel Velasco'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Noel Velasco'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        message : 'This is a help message',
        name : 'Noel Velasco'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'Address required'
        })
    }

    geoLocation(req.query.address, (error, {latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 
        
        foreCast(latitude, longitude, (error, { weather, temperature, feelsLike }) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location : req.query.address,
                weather,
                temperature,
                feelsLike
            })
        })
    })

   
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title : '404',
        message: 'Error 404, help page not found',
        name: 'Noel Velasco'
    })
})

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title : '404',
        message : 'Error 404, page not found',
        name : 'Noel Velasco'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})