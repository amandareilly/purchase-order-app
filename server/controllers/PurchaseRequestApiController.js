const SharedApi = require('../api/SharedApi');
// temporary until we hook up mongoose
const mockRequestData = require('../MOCK-DATA/mock-request-data');
// temporary until we hook up mongoose
const mockUserData = require('../MOCK-DATA/mock-user-data');

class PurchaseRequestApi {
    static getAllRequests(req, res) {
        // temporary - update when we hook up mongoose
        res.json(mockRequestData.purchase_requests);
    }

    static validateRequest(type, req) {
        let requiredFields = [];
        if (type === 'new') {
            requiredFields = ['requestorId', 'createdAt', 'status', 'items'];
            // make sure there is no id
            if (req.body.id) {
                return 'Cannot recreate existing purchase request.';
            }
        } else {
            requiredFields = ['id', 'requestorId', 'createdAt', 'status', 'items'];
            // make sure param id and body id match
            if (req.params.id != req.body.id) {
                return `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
            }
        }

        const message = SharedApi.checkForRequiredFields(requiredFields, req.body);
        if (message) {
            return message;
        }

        // if items are present, make sure they have all required fields
        let itemIdCounter = 1;
        for (const item of req.body.items) {
            const itemMessage = PurchaseRequestApi.checkItemForRequired(item);
            if (itemMessage) {
                return itemMessage;
            } else {
                // temporary until we hook up mongoose
                item.id = itemIdCounter;
                itemIdCounter++;
            }
        }
        return req.body;
    }

    static saveNewRequest(req, res) {
        // check for required fields
        const validation = PurchaseRequestApi.validateRequest('new', req);
        if (typeof(validation) === 'string') {
            console.error(validation);
            res.status(400).send(validation);
        }

        // temporary until we hook up mongoose
        // use timestamp as dummy id
        req.body.id = Date.now();

        // temporary until we hook up mongoose
        // persist request
        mockRequestData.purchase_requests.push(req.body);

        // temporary - update when we hook up mongoose
        return res.status(201).json(req.body);
    }

    static getRequestById(req, res) {
        // temporary - update when we hook up mongoose
        const requestIndex = mockRequestData.purchase_requests.findIndex(function(element) {
            return element.id == req.params.id;
        });

        res.json(mockRequestData.purchase_requests[requestIndex]);
    }

    static updateRequest(req, res) {
        // check for required fields
        const validation = PurchaseRequestApi.validateRequest('update', req);
        if (typeof(validation) === 'string') {
            console.error(validation);
            res.status(400).send(validation);
        }

        // temporary - update when we hook up mongoose
        const requestIndex = mockRequestData.purchase_requests.findIndex(function(element) {
            return element.id == req.params.id;
        });

        mockRequestData.purchase_requests[requestIndex] = req.body;
        res.status(200).json(req.body);
    }

    static deleteRequest(req, res) {
        // temporary - update when we hook up mongoose
        const index = PurchaseRequestApi.getRequestById(req.params.id);
        mockRequestData.purchase_requests.splice(index, 1);
        res.status(204).end();
    }

    static getRequestor(userId) {
        return mockUserData.getUserById(userId);
    }

    static checkItemForRequired(item) {
        const itemRequiredFields = ['name', 'qty', 'pricePer', 'neededBy', 'expeditedShipping'];
        const message = SharedApi.checkForRequiredFields(itemRequiredFields, item);

        return message;
    }
}

module.exports = PurchaseRequestApi;