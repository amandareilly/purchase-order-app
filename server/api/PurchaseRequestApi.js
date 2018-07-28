const SharedApi = require('./SharedApi');
// temporary until we hook up mongoose
const mockRequestData = require('../MOCK-DATA/mock-request-data');

class PurchaseRequestApi {
    static getAllRequests() {
        // temporary - update when we hook up mongoose
        return mockRequestData.purchase_requests;
    }

    static create(request) {
        // check for required fields
        const requiredFields = ['requestorId', 'createdAt', 'status', 'items'];
        const message = SharedApi.checkForRequiredFields(requiredFields, request);
        if (message) {
            return message;
        }

        // if items are present, make sure they have all required fields
        let itemIdCounter = 1;
        for (const item of request.items) {
            const itemMessage = PurchaseRequestApi.checkItemForRequired(item);
            if (itemMessage) {
                return itemMessage;
            } else {
                // temporary until we hook up mongoose
                item.id = itemIdCounter;
                itemIdCounter++;
            }
        }

        // make sure there is no id property
        if (request.id) {
            return 'Cannot recreate already saved request.';
        } else {
            // temporary until we hook up mongoose
            // use timestamp as unique id
            request.id = Date.now();
        }

        // temporary until we hook up mongoose
        // persist request
        mockRequestData.purchase_requests.push(request);

        // temporary - update when we hook up mongoose
        return request;
    }

    static getRequestById(id) {
        // temporary - update when we hook up mongoose
        const requestIndex = mockRequestData.purchase_requests.findIndex(function(element) {
            return element.id == id;
        });

        return mockRequestData.purchase_requests[requestIndex];
    }

    static deleteRequest(id) {
        // temporary - update when we hook up mongoose
        const index = PurchaseRequestApi.getRequestById(id);
        mockRequestData.purchase_requests.splice(index, 1);
    }

    static checkItemForRequired(item) {
        const itemRequiredFields = ['name', 'qty', 'pricePer', 'neededBy', 'expeditedShipping'];
        const message = SharedApi.checkForRequiredFields(itemRequiredFields, item);

        return message;
    }
}

module.exports = PurchaseRequestApi;