module.exports = function(databaseService) {

    let operations = {
        DELETE
    }

    function DELETE(req, res, next) {
        databaseService.deleteJob(req.params.id).then(result => {
            if(result)
                res.status(204).send()
            else
                res.status(404).send()
        })
    }

    DELETE.apiDoc = {
        description: 'Deletes Job',
        operationId: 'deleteJob',
        parameters: [
            {
                name: 'id',
                in: 'path',
                type: 'string',
                required: true,
                description: 'jobId of job to be deleted'
            }
        ],
        responses: {
            204: {
                description: 'Job Successfully deleted'
            },
            404: {
                description: 'No matching job found'
            }
        }
    }

    return operations
}