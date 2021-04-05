const apiDoc = {
    swagger: "2.0",
    basePath: "/v1",
    info: {
        title: "Provides centralized access to BetterCCW\'s database",
        version: "1.0.0"
    },
    definitions: {
        Order: {
            type: "object",
            properties: {
                orderName: {
                    description: "Name of the Order",
                    type: "string"
                },
                orderStatus: {
                    description: "Description of the Order",
                    type: "string"
                },
                endCustomer: {
                    description: "Customer\'s Name",
                    type: "string"
                },
                salesOrderNo: {
                    description: "Order Number",
                    type: "string"
                },
                salesOrderURL: {
                    description: "URL to order on Cisco Commerce Workspace",
                    type: "string"
                }
            },
            required: ["salesOrderNo"]
        },
        Job: {
            type: "object",
            properties: {
                jobID: {
                    description: "ID of the Job",
                    type: "string"
                },
                jobStatus: {
                    description: "Current status of Job",
                    type: "string"
                },
                startTime: {
                    description: "Time the Job started in UTC",
                    type: "string"
                },
                endTime: {
                    description: "Time the Job ended in UTC",
                    type: "string"
                },
                requester: {
                    description: "Name of the requester",
                    type: "string"
                }
            },
            required: ["jobID"]
        }
    },
    paths: {}
}

module.exports = apiDoc