require('isomorphic-fetch');

const mockUserData = require('../MOCK-DATA/mock-user-data');

const PurchaseRequest = require('../../source/client-js/PurchaseRequest');
const user = mockUserData.getUserById(67891);
const loggedIn = true;
const apiUrl = process.env.API_URL || 'http://localhost:8080/api/';

class RequestController {
    static getAllRequests(req, res) {
        const url = apiUrl + 'requests';
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                res.render('requestDashboard', {
                    loggedIn,
                    user,
                    data,
                    pageTitle: 'All Purchase Requests',
                });
            })
            .catch(error => console.error('Fetch Error: ', error));
    }

    static createNewRequest(req, res) {
        //TEMPORARY until we creat user system.
        const userId = 67891;
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
            .then((data) => {
                res.render('requestDetail', {
                    loggedIn,
                    user,
                    data,
                    pageTitle: 'Create Purchase Request',
                });
            })
            .catch(error => console.error('Fetch Error: ', error));
    }

    static getExistingRequest(req, res) {
        const data = null;
        res.render('requestDetail', {
            loggedIn,
            user,
            data,
        });
    }
}

module.exports = RequestController;