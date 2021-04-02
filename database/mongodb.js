const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Standard URI format: mongodb://[dbuser:dbpassword]@[host]:port/dbname, details set in .env
let uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB + '?retryWrites=true&w=majority';

let client

async function connectClient() {
    if (!client) {
        client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } else if (!client.topology.isConnected()) {
        client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
}

module.exports = {
    updateOne : async function (collection, filter, document) {
        await connectClient()

        if (client.isConnected()) {
            try {
                const orders = client.db().collection(collection);

                return orders.replaceOne(filter, document, {upsert: true})
            } catch (err) {
                console.error(err);
            }
        } else {
            console.error('MongoDB Client Disconnected')
        }
    },

    findDocument : async function (collection, query) {
        await connectClient()

        if (client.isConnected()) {
            try {
                const orders = client.db().collection(collection);

                let res = await orders.find(query).toArray();

                if (res.length > 0) {
                    return res
                } else {
                    return null;
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            console.error('MongoDB Client Disconnected')
        }
    }
}