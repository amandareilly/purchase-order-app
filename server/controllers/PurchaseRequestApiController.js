const SharedApi = require('../api/SharedApi');

const Request = require('../models/Request');

class PurchaseRequestApi {
    static getAllRequests(req, res) {
        Request
            .find()
            .then(requests => {
                res.json({
                    requests: requests.map(
                        (request) => request.serialize()
                    )
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    }

    static validateRequest(type, req) {
        let requiredFields = [];
        if (type === 'new') {
            requiredFields = ['requestor', 'status', 'items'];
            // make sure there is no id
            if (req.body.id) {
                return 'Cannot recreate existing purchase request.';
            }
        } else {
            requiredFields = ['id', 'status'];
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
        if (req.body.items) {
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

        Request
            .create({
                requestor: req.body.requestor,
                status: req.body.status,
                items: req.body.items,
            })
            .then(request => res.status(201).json(request.serialize()))
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error.' });
            });
    }

    static getRequestById(req, res) {
        return Request
            .findById(req.params.id)
            .populate('requestor')
            .exec()
            .then(request => {
                if (request) {
                    res.json(request.serialize());
                } else {
                    res.json({ request: "Not Found" });
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    }

    static updateRequest(req, res) {
        // check for required fields
        const validation = PurchaseRequestApi.validateRequest('update', req);
        if (typeof(validation) === 'string') {
            console.error(validation);
            res.status(400).send(validation);
        }
        Request.findById(req.body.id)
            .then(request => {
                request.status = req.body.status;
                return request;
            })
            .then(request => request.save())
            .then(updatedRequest => res.status(204).json(updatedRequest.serialize()))
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    }

    static deleteRequest(req, res) {
        Request.findById(req.params.id)
            .then((request) => {
                if (request.status != 'created') {
                    res.status(400).send(`Only requests with status 'created' can be deleted.  The specified request currently has a status of ${request.status}.`);
                    return;
                }
                request.remove();
                res.status(204).end();
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    }

    static checkItemForRequired(item) {
        const itemRequiredFields = ['name', 'qty', 'pricePer', 'neededBy', 'expeditedShipping'];
        const message = SharedApi.checkForRequiredFields(itemRequiredFields, item);

        return message;
    }
}

module.exports = PurchaseRequestApi;