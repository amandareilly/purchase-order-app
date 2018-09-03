require('isomorphic-fetch');

const User = require('./../models/User');
// temporary
const user = User.findById('5b70f8d709110643dc2320c8');
const mongoose = require('mongoose');

const loggedIn = true;

const SharedApi = require('../api/SharedApi');

class RequestController {
    static getAllRequests(req, res) {
        const url = SharedApi.constructApiUrl(req, 'requests');
        fetch(url)
            .then(response => response.json())
            .then(data => {
                RequestController.renderRequestPage(res, 'requestDashboard', loggedIn, user, data.requests, 'All Purchase Requests')
            })
            .catch(error => console.error('Fetch Error: ', error));
    }

    static createNewRequest(req, res) {
        //TEMPORARY until we create user system.
        const userId = mongoose.Types.ObjectId('5b70f8d709110643dc2320c8');
        // end temporary

        const url = SharedApi.constructApiUrl(req, 'requests');

        const requestData = {
            requestor: userId,
            status: 'created',
            items: []
        };

        fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then(response => response.json())
            .then(data => {
                res.redirect('/requests/' + data.id);
            })
            .catch(error => console.error('Fetch Error: ', error));
    }

    static getExistingRequest(req, res) {
        const url = SharedApi.constructApiUrl(req, 'requests/' + req.params.id);
        fetch(url)
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
        console.log("Hit Delete Item");
        const endpoint = 'requests/' + req.params.id + '/item/' + req.params.itemId;
        const url = SharedApi.constructApiUrl(req, endpoint);

        fetch(url, {
                method: 'DELETE'
            })
            .then((response) => {
                console.log(response);
                return res.redirect('/requests/' + req.params.id);
            })
    }
}

module.exports = RequestController;