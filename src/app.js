const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(publicDirectoryPath)
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Michal'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Michal'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'This is some helpful text.',
        name: 'Michal'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address!"
        })
    }
        // res.send({
        //     location: 'Philadelphia',
        //     forecast: 'Its 55 degrees outside.',
        //     address: req.query.address
        // })
        geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
                
              })
        })
    
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorText: 'Article not found!',
        name: 'Michal'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorText: 'Page not found!',
        name: 'Michal'
    })
})

app.listen(3000, () => {
    console.log('Server is UP on port 3000.')
})