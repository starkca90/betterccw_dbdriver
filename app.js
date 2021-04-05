const express = require('express')
const logger = require('morgan')
const { initialize } = require('express-openapi')
const v1DatabaseService = require('./api-v1/services/databaseService')
const v1ApiDoc = require('./api-v1/api-doc')
const swaggerUi = require('swagger-ui-express')

const app = express()

app.use(express.urlencoded())

app.listen(3030)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/health', require('./health/routes_health'))

// OpenAPI Routes
initialize({
    app,
    apiDoc: v1ApiDoc,
    dependencies: {
        databaseService: v1DatabaseService
    },
    errorMiddleware: function(err, req, res, next) { // only handles errors for /v3/*
        console.error(err)

        res.status(err.status).send(err.errors)
    },
    paths: "./api-v1/paths"
})

// OpenAPI UI
app.use(
    "/api-documentation",
    swaggerUi.serve,
    swaggerUi.setup(null, {
        swaggerOptions: {
          url: "http://localhost:3030/v1/api-docs",
          explorer: true
        }
      })
)

module.exports = app
