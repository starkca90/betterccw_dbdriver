const jobs = require('./database/jobs')
const orders = require('./database/orders')

const databaseService = {
    async getOrder(order) {
        return await orders.getOrders(order)
    },

    async createOrder(order) {
        return await orders.insertOrders(order)
    },

    async getJob(job) {
        return await jobs.getJob(job)
    },

    async createJob(job) {
        return await jobs.updateJob(job)
    }
}

module.exports = databaseService