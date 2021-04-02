/**
 * Provides access to information about orders
 */

const express = require('express')
const orders = require('./../database/orders')

const router = express.Router()

/**
 * Gets order information
 *
 * Expects a parameters of the name order to be passed with the request. Can be a string with a single order number or
 * an array of strings with
 */
router.get('/', (req, res) => {
    console.log(req.query)

    if(req.query.order !== undefined) {
        console.log('Order Present')

        orders.getOrders(JSON.parse(req.query.order)).then((found_orders) => {

            // If an error is found in the entry, 'ERROR' is returned, check for that and inform the caller
            if (found_orders === 'ERROR') {
                res.status(400)
                res.send('One of the request inputs is not valid.')
            }

            res.send(found_orders)
        })

    } else {
        res.status(400)
        res.send('One of the request inputs is not valid.')
    }

})

/**
 * Add/Updates order information
 */
router.post('/', (req, res) => {
    console.log('Order Post Received')

    if(req.body.salesOrderNo !== undefined) {
        orders.insertSingleOrder(req.body).then((insert_result) => {
            // If the insert is successful, an object type is in the message field
            // If an error is encountered the insert, a string is returned with a description

            // Check if we have a string and set an error status code
            if (typeof insert_result.message === 'string') {
                res.status(400)
            }

            // Return the message field
            res.send(insert_result.message)
        })
    } else {
        res.status(400)
        res.send('One of the request inputs is not valid.')
    }
})

module.exports = router