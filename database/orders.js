const backend = require('./mongodb')

const db_collection = process.env.COL_ORDERS

module.exports = {
    getOrders : async function (orderIds) {
        let query

        if(typeof orderIds === 'string') {
            console.log('Single Order')
            query = {salesOrderNo: orderIds}

        } else if (typeof orderIds === 'object') {
            console.log('Multiple Orders')
            query = {salesOrderNo: {$in: orderIds}}
        } else {
            console.error('Unknown orderIds Type: ', orderIds, typeof orderIds)
            return 'ERROR'
        }

        return await backend.findDocument(db_collection, query)
    },

    insertSingleOrder : function (order) {
        return backend.updateOne(db_collection,{salesOrderNo: order.salesOrderNo}, order)
    }
}