const chai = require('chai');
const app = require('../../server/app');
const Request = require('../../server/models/Request');
const { runServer, closeServer } = require('../../server/server');
const { TEST_DATABASE_URL, TEST_PORT } = require('../../server/config');
const GeneralHelper = require('../helpers/GeneralHelper');
const RequestHelper = require('../helpers/RequestHelper');
const User = require('../../server/models/User');
const Auth = require('../../server/controllers/AuthController');
const { expect } = chai;



describe('Purchase Request API', function() {
    // starts the server before running tests
    before(function() {
        return runServer(TEST_DATABASE_URL, TEST_PORT);
    });

    // closes the server after running tests
    after(function() {
        return closeServer();
    });

    beforeEach(function() {
        return RequestHelper.seedRequestData();
    });

    afterEach(function() {
        return GeneralHelper.tearDownDb();
    });

    describe('GET Endpoint', function() {
        it('should return all existing requests', function() {
            let res;
            return GeneralHelper.httpAuthenticated(app, '/api/requests', 'get')
                .then(function(_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res.body.requests).to.have.lengthOf.at.least(1);
                    return Request.countDocuments();
                })
                .then(function(count) {
                    expect(res.body.requests).to.have.lengthOf(count);
                });
        });
        it('should return requests with right fields', function() {
            let resRequest;
            return GeneralHelper.httpAuthenticated(app, '/api/requests', 'get')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.requests).to.be.a('array');
                    expect(res.body.requests).to.have.lengthOf.at.least(1);

                    res.body.requests.forEach(function(request) {
                        expect(request).to.be.a('object');
                        expect(request).to.include.keys('id', 'requestor', 'status', 'items', 'createdAt', 'updatedAt', 'vendor', 'notes', 'requestTotal');
                    });
                    resRequest = res.body.requests[0];
                    return Request.findById(resRequest.id);
                })
                .then(function(request) {
                    expect(resRequest.id).to.equal(request.id);
                    expect(resRequest.status).to.equal(request.status);
                });
        });
        it('should return a specific request by id', function() {
            let testRequest;
            return GeneralHelper.httpAuthenticated(app, '/api/requests', 'get')
                .then(function(res) {
                    const requestToFind = res.body.requests[0];
                    testRequest = requestToFind;
                    return requestToFind;
                })
                .then(function(requestToFind) {
                    const url = `/api/requests/${requestToFind.id}`;
                    return GeneralHelper.httpAuthenticated(app, url, 'get')
                        .then(function(res) {
                            expect(res.body.id).to.equal(testRequest.id);
                            expect(res.body.status).to.equal(testRequest.status);
                            expect(res.body.requestor.id).to.equal(testRequest.requestor.id);
                            expect(res.body.items.length).to.equal(testRequest.items.length);
                        })
                });
        });
    });

    describe('POST Endpoint', function() {
        it('should add a new request', function() {
            let resRequest;
            const newRequest = RequestHelper.generateRequestData(true, true);
            return GeneralHelper.httpAuthenticated(app, '/api/requests', 'post')
                .send(newRequest)
                .then(function(res) {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('id', 'requestor', 'status', 'items', 'createdAt', 'updatedAt');
                    expect(res.body.id).to.not.be.null;
                    expect(res.body.requestor.id).to.equal(newRequest.requestor.toHexString());
                    expect(res.body.vendor.name).to.equal(newRequest.vendorName);
                    expect(res.body.status).to.equal(newRequest.status);
                    expect(res.body.items[0].name).to.equal(newRequest.items[0].name);
                    expect(res.body.items[0].qty).to.equal(newRequest.items[0].qty);
                    resRequest = res.body;
                    return Request.findById(res.body.id);
                })
                .then(function(res) {
                    expect(res.id).to.equal(resRequest.id);
                    expect(res.status).to.equal(resRequest.status);
                });
        });
    });

    describe('PUT Endpoint', function() {
        it('should update status only', function() {
            const updateData = {
                status: 'jkljkljl',
                requestor: 'lmnop'
            };

            return User.findById('5b70f8d709110643dc2320c8')
                .then(user => user.serialize())
                .then((user) => {
                    user.role = 'basic';
                    const token = Auth.createAuthToken(user);

                    return Request
                        .findOne()
                        .then(function(request) {
                            updateData.id = request.id;

                            return GeneralHelper.httpAuthenticated(app, `/api/requests/${request.id}`, 'put')
                                .set('Cookie', `jwt=${token}`)
                                .send(updateData);
                        })
                        .then(function(res) {
                            expect(res).to.have.status(200);
                            return Request.findById(updateData.id);
                        })
                        .then(function(request) {
                            expect(request.status).to.equal(updateData.status);
                            expect(request.requestor).to.not.equal(updateData.requestor);
                        });

                });
        });
    });

    describe('DELETE Endpoint', function() {
        it('should delete a request with a status of created', function() {
            const newRequestData = RequestHelper.generateRequestData();
            newRequestData.status = 'created';
            return Request.create(newRequestData)
                .then((request) => {
                    return GeneralHelper.httpAuthenticated(app, `/api/requests/${request.id}`, 'delete')
                        .then(function(res) {
                            expect(res).to.have.status(204);
                            return Request.findById(request.id);
                        })
                    then(function(_request) {
                        expect(_request).to.be.null;
                    });
                });
        });

        it('should not delete a request with a status other than created', function() {
            let request;
            const newRequestData = RequestHelper.generateRequestData();
            newRequestData.status = 'somethingelse';
            return Request.create(newRequestData)
                .then((_request) => {
                    request = _request;
                    return GeneralHelper.httpAuthenticated(app, `/api/requests/${request.id}`, 'delete')
                        .then(function(res) {
                            expect(res).to.have.status(400)
                            return Request.findById(request.id);
                        })
                        .then(function(_request) {
                            expect(_request.id).to.equal(request.id);
                            expect(_request.status).to.equal(request.status);
                            expect(_request.items.length).to.equal(request.items.length);
                        });
                });
        });
    });
});