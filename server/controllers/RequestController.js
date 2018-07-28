const PurchaseRequest = require('../../source/client-js/classes/PurchaseRequest');
const PurchaseRequestApi = require('../api/PurchaseRequestApi');
const mockUserData = require('../MOCK-DATA/mock-user-data');

const user = mockUserData.getUserById(67891);
const loggedIn = true;


class RequestController {
    static getAllRequests(req, res) {
        const data = PurchaseRequestApi.getAllRequests();
        res.render('requestDashboard', {
            loggedIn,
            user,
            data,
        });
    }

    static createNewRequest(req, res) {
        const data = PurchaseRequestApi.create(new PurchaseRequest(user.id));
        res.render('requestDetail', {
            loggedIn,
            user,
            data,
        });
    }

    static getExistingRequest(req, res) {
        const data = PurchaseRequestApi.getRequestById(req.params.id);
        res.render('requestDetail', {
            loggedIn,
            user,
            data,
        });
    }
}

module.exports = RequestController;