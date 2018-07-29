const PurchaseRequest = require('../../source/client-js/classes/PurchaseRequest');
const PurchaseRequestApi = require('../controllers/PurchaseRequestApiController');
const mockUserData = require('../MOCK-DATA/mock-user-data');

const user = mockUserData.getUserById(67891);
const loggedIn = true;


class RequestController {
    static getAllRequests(req, res) {
        const data = null;
        res.render('requestDashboard', {
            loggedIn,
            user,
            data,
            pageTitle: 'All Purchase Requests',
        });
    }

    static createNewRequest(req, res) {
        const data = null;
        res.render('requestDetail', {
            loggedIn,
            user,
            data,
            pageTitle: 'Create Purchase Request',
        });
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