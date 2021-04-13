module.exports = function(databaseService) {
    let operations = {
        GET,
        POST
    }

    function GET(req, res, next) {
        console.log(req.query)

        if(req.query.order !== undefined) {
            console.log('Order Present')

            let orderId

            // Check if requester wrapped the order id in quotes
            if((req.query.order.charAt(0) === "\"" && req.query.order.charAt(req.query.order.length - 1) === "\"") ||
                (req.query.order.charAt(0) === "[" && req.query.order.charAt(req.query.order.length - 1) === "]"))
                orderId = JSON.parse(req.query.order)
            else
                orderId = req.query.order

            // An array of order ids was passed in, make sure each order id is normalized
            if(typeof orderId === 'object') {
                orderId.forEach((order, index) => {
                    if(typeof order === 'number')
                        orderId[index] = order.toString()
                })
            }

            databaseService.getOrder(orderId).then((found_orders) => {

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

    }

    function POST(req, res, next) {
        console.log('Order Post Received')

        if(req.body.salesOrderNo !== undefined) {
            databaseService.createOrder(req.body).then((insert_result) => {
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
    }

    GET.apiDoc = {
        summary: 'Returns information about the requested Order',
        operationId: 'getOrders',
        parameters: [
            {
                in: 'query',
                name: 'order',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'Information about the order that match the requested order',
                schema: {
                    type: 'object',
                    items: {
                        $ref: '#/definitions/Order'
                    }
                }
            },
            default: {
                description: 'An Unknown error occurred',
                schema: {
                    additionalProperties: true
                }
            }
        }
    }

    POST.apiDoc = {
        summary: 'Inserts the supplied order',
        operationId: 'createOrder',
        consumes: ['application/json'],
        parameters: [
            {
                in: 'body',
                name: 'order',
                schema: {
                    $ref: '#/definitions/Order'
                }
            }
        ],
        responses: {
            200: {
                description: 'Order Created',
            },
            400: {
                description: 'Error with provided data',
            }
        }
    }

    return operations
}