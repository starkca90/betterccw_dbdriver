const backend = require('./mongodb')

const db_collection = process.env.COL_JOBS

module.exports = {
    getJob : async function (jobId) {
        return await backend.findDocument(db_collection, {jobID: jobId})
    },

    updateJob : function (job) {
        return backend.updateOne(db_collection,{jobID: job.jobID}, job)
    },

    deleteJob : function (jobId) {
        return backend.deleteDocument(db_collection, {jobID: jobId})
    },

    getRequests : async function (requester) {
        return await backend.findDocument(db_collection, {requester: requester})
    }
}