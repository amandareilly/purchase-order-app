const SharedApi = require('../api/SharedApi');

const Request = require('../models/Request');

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
            console.error(message);
            res.status(400).send(message);
        }

        const item = req.body;
        delete item.requestId;

        const validation = ItemApi.checkItemForRequired(item);
        if (validation) {
            console.error(validation);
            res.status(400).send(validation);
        }

        Request.findById(requestId)
            .then((request) => {
                console.log("request: ", request);
                request.items.push(item);
                return request;
            })
            .then(request => request.save())
            .then((updatedRequest) => {
                res.status(200)
                    .json(updatedRequest.serialize())
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

module.exports = ItemApi;