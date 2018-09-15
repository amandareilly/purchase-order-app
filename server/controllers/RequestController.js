require('isomorphic-fetch');

const loggedIn = true;

const SharedApi = require('../api/SharedApi');

class RequestController {
    static getAllRequests(req, res) {
        const token = req.cookies.jwt;
        const query = req.url || null;
        const url = SharedApi.constructApiUrl(req, 'requests' + (query ? query : ''));
        const headers = SharedApi.getHeadersWithToken(req);

        let user;
        return SharedApi.getUser(req)
            .then((foundUser) => {
                user = foundUser;
            })
            .then(() => {
                return fetch(url, {
                        mode: 'same-origin',
                        headers: headers
                    })
                    .then((response) => {
                        if (response.status === 401) {
                            res.redirect('/login');
                        }
                        return response.json();
                    })
                    .then(data => {
                        RequestController.renderRequestPage(res, 'requestDashboard', loggedIn, user._id, data.requests, 'All Purchase Requests')
                    })
                    .catch(error => console.error('Fetch Error: ', error));
            })
            .catch((error) => {
                console.error(error);
            });

    }

    static createNewRequest(req, res) {
        const user = SharedApi.getUser(req);
        const userId = user._id;

        const vendorName = req.body.vendorName || 'System Vendor';

        const url = SharedApi.constructApiUrl(req, 'requests');

        const requestData = {
            requestor: userId,
            status: 'created',
            items: [],
            vendorName
        };

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
    }

    static getExistingRequest(req, res) {
        const user = SharedApi.getUser(req);
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
    }

    static renderRequestPage(res, view, loggedIn, user, data, pageTitle) {
        res.render(view, {
            loggedIn,
            user,
            data,
            pageTitle
        });
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