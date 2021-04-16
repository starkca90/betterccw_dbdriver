module.exports = function(databaseService) {

    let operations = {
        GET
    }

    function GET(req, res, next) {
        console.log(req.query)

        if(req.query.requester !== undefined) {
            console.log('Requester Present')

            let requester

            // Check if requester wrapped job id in quotes
            if(req.query.requester.charAt(0) === "\"" && req.query.requester.charAt(req.query.job.length - 1) === "\"")
                requester = JSON.parse(req.query.requester)
            else
                requester = req.query.requester

            databaseService.getRequests(requester).then((found_jobs) => {

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

     GET.apiDoc = {
        summary: "Returns all jobs the requester requested",
        operationId: "getRequests",
        parameters: [
            {
                in: "query",
                name: "requester",
                required: true,
                type: "string"
            }
        ],
        responses: {
            200: {
                description: "Information about the jobs that requester requested",
                schema: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/Job"
                    }
                }
            }
        }
    }

    return operations
}