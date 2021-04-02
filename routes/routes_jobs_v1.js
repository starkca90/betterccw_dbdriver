/**
 * Provides access to tracking status of background jobs
 */

const express = require('express')
const jobs = require('./../database/jobs')

const router = express.Router()

/**
 * Gets job information
 *
 * Expects a parameters of the name job to be passed with the request. Can be a string with a single job number or
 * an array of strings
 */
router.get('/', (req, res) => {
    console.log(req.query)

    if(req.query.job !== undefined) {
        console.log('Job Present')
        console.log(req.query.job)

        jobs.getJob(JSON.parse(req.query.job)).then((found_jobs) => {

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

})

/**
 * Add/Updates job information
 */
router.post('/', (req, res) => {
    console.log('Job Post Received')

    if(req.body.jobID !== undefined) {
        jobs.updateJob(req.body).then((insert_result) => {
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