const backend = require('./mongodb')

const db_collection = process.env.COL_JOBS

module.exports = {
    getSingleOrder : async function (orderId) {
        return await backend.findDocument(db_collection,{salesOrderNo: orderId})
    },

    getManyOrders: async function (orderIds) {
        return await backend.findDocument(db_collection,{salesOrderNo: {$in: orderIds}})
    },

    getRegexOrders: async function (orderIds, filter) {
        const query = {
            // Want to find orders where they are within the orderIds array and regex is satisfied
            $and: [
                // salesOrderNo is in the orderIds array
                {salesOrderNo: {$in: orderIds}},
                {
                    // Either itemName or itemDescription satisfies regex
                    $or: [
                        {'lineItems.itemName': {$regex: filter, $options: 'i'}},
                        {'lineItems.itemDescription': {$regex: filter, $options: 'i'}}
                    ]
                }
            ]
        }

        return await backend.findDocument(db_collection, query)
    },

    insertSingleOrder : function (order) {
        return backend.updateOne(db_collection,{salesOrderNo: order.salesOrderNo}, order)
    }
}