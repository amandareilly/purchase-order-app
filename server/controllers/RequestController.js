require('isomorphic-fetch');

//temporary
const User = require('../models/User');
// temporary
const user = User.findById('5b70f8d709110643dc2320c8');
// temporary
const mongoose = require('mongoose');
const PurchaseRequest = require('../../source/client-js/PurchaseRequest');

const loggedIn = true;
const apiUrl = process.env.API_URL || 'http://localhost:8080/api/';

class RequestController {
    static getAllRequests(req, res) {
        const url = apiUrl + 'requests';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                RequestController.renderRequestPage(res, 'requestDashboard', loggedIn, user, data.requests, 'All Purchase Requests')
            })
            .catch(error => console.error('Fetch Error: ', error));
    }

    static createNewRequest(req, res) {
        //TEMPORARY until we create user system.
        const userId = mongoose.Types.ObjectId('5b70f8d709110643dc2320c8');
        // end temporary

        const url = apiUrl + 'requests';
        fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new PurchaseRequest(userId))
            })
            .then(response => response.json())
            .then(data => {
                res.redirect('/requests/' + data.id);
            })
            .catch(error => console.error('Fetch Error: ', error));
    }

    static getExistingRequest(req, res) {
        const url = apiUrl + 'requests/' + req.params.id;
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
}

module.exports = RequestController;