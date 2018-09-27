require('isomorphic-fetch');

const loggedIn = true;

const SharedApi = require('../api/SharedApi');

class RequestController {
    static getAllRequests(req, res) {
        let userList;
        let vendorList;
        let filterByUser = false;
        if (req.query.user && req.query.user == req.user._id) {
            filterByUser = true;
        }
        let query = req.url || null;
        let url;
        const headers = SharedApi.getHeadersWithToken(req);

        let user;
        const userUrl = SharedApi.constructApiUrl(req, 'users');
        const vendorUrl = SharedApi.constructApiUrl(req, 'distinctVendors');
        return fetch(userUrl, {
                headers: headers
            })
            .then(response => response.json())
            .then((data) => {
                userList = data;
                return fetch(vendorUrl, {
                        headers: headers
                    })
                    .then(response => response.json())
                    .then((data) => {
                        vendorList = data;
                        return SharedApi.getUser(req)
                            .then((foundUser) => {
                                user = foundUser;
                                if (user.role == 'basic') {
                                    if (query && query != '/') {
                                        query += `&user=${user._id}`;
                                    } else {
                                        query = `?user=${user._id}`
                                    }
                                }
                                url = SharedApi.constructApiUrl(req, 'requests' + (query ? query : ''));
                            })
                            .then(() => {
                                return fetch(url, {
                                        headers: headers
                                    })
                                    .then((response) => {
                                        if (response.status === 401) {
                                            res.redirect('/login');
                                        }
                                        return response.json();
                                    })
                                    .then(data => {
                                        const sortedData = {
                                            all: [],
                                            created: [],
                                            submitted: [],
                                            approved: [],
                                            denied: [],
                                            ordered: [],
                                            complete: []
                                        };
                                        const groupsFound = {
                                            created: false,
                                            submitted: false,
                                            approved: false,
                                            denied: false,
                                            ordered: false,
                                            complete: false
                                        };

                                        data.requests.forEach((request) => {
                                            sortedData[request.status].push(request);
                                            groupsFound[request.status] = true;
                                        });
                                        sortedData['all'] = data.requests;
                                        data = sortedData;
                                        RequestController.renderRequestPage(res, 'requestDashboard', loggedIn, user, data, 'All Purchase Requests', filterByUser, userList, vendorList, groupsFound);
                                    })
                                    .catch(error => console.error('Fetch Error: ', error));
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });


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
                        RequestController.renderRequestPage(res, 'requestDetail', loggedIn, user, data, pageTitle, null, );
                    })
                    .catch(error => console.error('Fetch Error: ', error));
            })

    }

    static renderRequestPage(res, view, loggedIn, user, data, pageTitle, filterByUser, userList, vendorList, groupsFound) {
        res.render(view, {
            loggedIn,
            user,
            data,
            pageTitle,
            filterByUser,
            userList,
            vendorList,
            groupsFound
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