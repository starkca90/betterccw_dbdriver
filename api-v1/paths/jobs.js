module.exports = function(databaseService) {
    let operations = {
        GET,
        POST
    }

    function GET(req, res, next) {
        console.log(req.query)

        if(req.query.job !== undefined) {
            console.log('Job Present')
            console.log(req.query.job)

            databaseService.getJob(JSON.parse(req.query.job)).then((found_jobs) => {

                // If an error is found in the entry, 'ERROR' is returned, check for that and inform the caller
                if (found_jobs === 'ERROR') {
                    res.status(400)
                    res.send('One of the request inputs is not valid.')
                } else if (found_jobs === null) {
                    res.status(404)
                }

                res.send(found_jobs)
            })

        } else {
            res.status(400)
            res.send('One of the request inputs is not valid.')
        }
    }

    function POST(req, res, next) {
        console.log('Job Post Received')

        if(req.body.jobID !== undefined) {
            databaseService.createJob(req.body).then((insert_result) => {
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
        summary: 'Returns information about the requested Job',
        operationId: 'getJobs',
        parameters: [
            {
                in: 'query',
                name: 'job',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'Information about the job that match the requested job',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Jobs'
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
        summary: 'Inserts the supplied job',
        operationId: 'createJob',
        consumes: ['application/json'],
        parameters: [
            {
                in: 'body',
                name: 'job',
                schema: {
                    $ref: '#/definitions/Job'
                }
            }
        ],
        responses: {
            200: {
                description: 'Job Created',
            },
            400: {
                description: 'Error with provided data',
            }
        }
    }

    return operations
}