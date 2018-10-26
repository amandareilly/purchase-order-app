require('isomorphic-fetch');

const loggedIn = true;

const SharedApi = require('../api/SharedApi');

class RequestController {
    static getAllRequests(req, res) {
        const headers = SharedApi.getHeadersWithToken(req);
        const vendorUrl = SharedApi.constructApiUrl(req, 'distinctVendors');
        return fetch(vendorUrl, {
                headers: headers
            })
            .then(response => response.json())
            .then(data => {
                const vendorList = data;
                return SharedApi.getUser(req)
                    .then((user) => {
                        const data = null;
                        RequestController.renderRequestPage(res, 'requestDashboard', loggedIn, user, data, 'All Requests', vendorList);
                    });
            })
            .catch(err => console.error(err));

    }

    static createNewRequest(req, res) {
        let user;
        let userId;
        let requestData;

        const vendorName = req.body.vendorName || req.body.vendorSelector || 'System Vendor';
        const url = SharedApi.constructApiUrl(req, 'requests');

        return SharedApi.getUser(req)
            .then((foundUser) => {
                user = foundUser;
                userId = user.id || user._id;

                requestData = {
                    requestor: userId,
                    status: 'created',
                    items: [],
                    vendorName
                };
            })
            .then(() => {
                fetch(url, {
                        method: 'post',
                        headers: SharedApi.getHeadersWithToken(req, true),
                        body: JSON.stringify(requestData)
                    })
                    .then(response => response.json())
                    .then(data => {
                        res.redirect('/requests/' + data.id);
                    })
                    .catch(error => console.error('Fetch Error: ', error));
            });

    }

    static getExistingRequest(req, res) {
        let user;
        SharedApi.getUser(req)
            .then((foundUser) => {
                user = foundUser;
                const url = SharedApi.constructApiUrl(req, 'requests/' + req.params.id);
                fetch(url, {
                        headers: SharedApi.getHeadersWithToken(req)
                    })
                    .then(response => response.json())
                    .then((data) => {
                        let pageTitle = 'Request Not Found';
                        if (!data.error) {
                            pageTitle = `Request # ${data.id}`;
                        }
                        RequestController.renderRequestPage(res, 'requestDetail', loggedIn, user, data, pageTitle);
                    })
                    .catch(error => console.error('Fetch Error: ', error));
            })

    }

    static renderRequestPage(res, view, loggedIn, user, data, pageTitle, vendorList = null) {
        const vars = {
            loggedIn,
            user,
            data,
            pageTitle
        };
        if (vendorList) {
            vars.vendorList = vendorList;
        }
        res.render(view, vars);
    }

    static deleteItem(req, res) {
        const endpoint = 'requests/' + req.params.id + '/item/' + req.params.itemId;
        const url = SharedApi.constructApiUrl(req, endpoint);

        fetch(url, {
                method: 'DELETE',
                headers: SharedApi.getHeadersWithToken(req)
            })
            .then((response) => {
                return res.redirect('/requests/' + req.params.id);
            })
    }

    static addItem(req, res) {
        const endpoint = 'requests/' + req.params.id + '/addItem';
        const url = SharedApi.constructApiUrl(req, endpoint);
        const itemRequest = {
            requestId: req.params.id,
            name: req.body.itemName,
            qty: req.body.itemQty,
            pricePer: req.body.itemPrice,
            neededBy: req.body.neededBy,
            expeditedShipping: false,
        };
        if (req.body.expeditedShipping === 'on') {
            itemRequest.expeditedShipping = true;
        }
        if (req.body.itemLink) {
            itemRequest.link = req.body.itemLink;
        }
        if (req.body.itemNotes) {
            itemRequest.notes = req.body.itemNotes;
        }

        fetch(url, {
                method: 'post',
                headers: SharedApi.getHeadersWithToken(req, true),
                body: JSON.stringify(itemRequest)
            })
            .then((response) => {
                return res.redirect('/requests/' + req.params.id);
            });
    }
}

module.exports = RequestController;