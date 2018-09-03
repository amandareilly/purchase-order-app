const SharedApi = require('../api/SharedApi');
const Request = require('../models/Request');
const CustomServerError = require('../CustomError');

class ItemApi {
    static addItem(req, res) {
        // Item request format:
        // {
        //     requestId: requestId
        //     name: 'item name',
        //     qty: 1,
        //     pricePer: 9.99,
        //     neededBy: 'date',
        //     expeditedShipping: 'false',
        //     link: url for purchase info,
        //     notes: any notes
        // }

        // link and notes are not required fields

        const requestId = req.params.id;
        // request ID in URL must match request id in body
        if (requestId != req.body.requestId) {
            const message = 'Request ID in URL and in request body must match.';
            throw new CustomServerError(message, 400);
        }

        const item = req.body;
        delete item.requestId;

        const validation = ItemApi.checkItemForRequired(item);
        if (validation) {
            throw new CustomServerError(validation, 400);
        }

        Request.findById(requestId)
            .then((request) => {
                request.items.push(item);
                return request;
            })
            .then(request => request.save())
            .then((updatedRequest) => {
                res.status(200)
                    .json(updatedRequest.serialize())
            })
            .catch((err) => {
                CustomServerError.handle(err, res);
            });
    }

    static deleteItem(req, res) {
        Request.findById(req.params.id)
            .then((request) => {
                if (!request.items.id(req.params.itemId)) {
                    const message = ('Item not found.');
                    throw new CustomServerError(message, 400);
                } else {
                    request.items.id(req.params.itemId).remove();
                    return request.save();
                }
            })
            .then((updatedRequest) => {
                res.status(200).json(updatedRequest.serialize());
            })
            .catch((err) => {
                CustomServerError.handle(err, res);
            });
    }

    static updateItem(req, res) {
        const reqId = req.params.id;
        const itemId = req.params.itemId;

        Request.findById(reqId)
            .then((request) => {
                let message;
                if (!request.items.id(itemId)) {
                    message += '* Item not found. '
                }

                if (itemId !== req.body.itemId) {
                    message = '* Item Id in URL and Body must match. ';
                }

                if (reqId !== req.body.reqId) {
                    message = '* Body Id in URL and Body must match. ';
                }

                if (message) {
                    throw new CustomServerError(message, 400);
                }

                const updatable = ['name', 'qty', 'pricePer', 'neededBy', 'expeditedShipping', 'link', 'notes'];
                const updateData = {}
                updatable.forEach((property) => {
                    if (req.body[property]) {
                        updateData[property] = req.body[property];
                    }
                });
                const itemToUpdate = request.items.id(itemId);
                itemToUpdate.set(updateData);
                return request.save();
            })
            .then((request) => {
                res.status(200).json(request.serialize());
            })
            .catch((err) => {
                CustomServerError.handle(err, res);
            });
    }

    static checkItemForRequired(item) {
        const itemRequiredFields = ['name', 'qty', 'pricePer', 'neededBy', 'expeditedShipping'];
        const message = SharedApi.checkForRequiredFields(itemRequiredFields, item);

        return message;
    }
}

module.exports = ItemApi;