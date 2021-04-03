const express = require('express')
const logger = require('morgan')
const { initialize } = require('express-openapi')
const v1DatabaseService = require('./api-v1/services/databaseService')
const v1ApiDoc = require('./api-v1/api-doc')
const swaggerUi = require('swagger-ui-express')

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded())

// OpenAPI Routes
initialize({
    app,
    apiDoc: v1ApiDoc,
    dependencies: {
        databaseService: v1DatabaseService
    },
    paths: './api-v1/paths'
})

app.use('/health', require('./health/routes_health'))

// OpenAPI UI
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(v1ApiDoc)
)

module.exports = app
