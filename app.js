const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Tell express about body-parser (retrieves data from forms)
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}))
app.use(bodyParser.json({limit: '200mb'}))

// Allow express to serve files from the public folder
app.use(express.static('public'))

// Tell express about the routes
app.use('/health', require('./routes/routes_health'))
app.use('/v1/jobs', require('./routes/routes_jobs_v1'))
app.use('/v1/orders', require('./routes/routes_orders_v1'))

module.exports = app