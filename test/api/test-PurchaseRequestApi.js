const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server/app');
const Request = require('../../server/models/Request');
const { runServer, closeServer } = require('../../server/server');
const { TEST_DATABASE_URL, TEST_PORT } = require('../../server/config');
const GeneralHelper = require('../helpers/GeneralHelper');
const RequestHelper = require('../helpers/RequestHelper');
const { expect } = chai;
chai.use(chaiHttp);



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
            return chai.request(app)
                .get('/api/requests')
                .then(function(_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res.body.requests).to.have.lengthOf.at.least(1);
                    return Request.count();
                })
                .then(function(count) {
                    expect(res.body.requests).to.have.lengthOf(count);
                });
        });
        it('should return requests with right fields', function() {
            let resRequest;
            return chai.request(app)
                .get('/api/requests')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.requests).to.be.a('array');
                    expect(res.body.requests).to.have.lengthOf.at.least(1);

                    res.body.requests.forEach(function(request) {
                        expect(request).to.be.a('object');
                        expect(request).to.include.keys('id', 'requestor', 'status', 'items', 'createdAt', 'updatedAt');
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
            return chai.request(app)
                .get('/api/requests')
                .then(function(res) {
                    const requestToFind = res.body.requests[0];
                    testRequest = requestToFind;
                    return requestToFind;
                })
                .then(function(requestToFind) {
                    const url = `/api/requests/${requestToFind.id}`;
                    console.log("URL: ", url);
                    return chai.request(app)
                        .get(url)
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
            const newRequest = RequestHelper.generateRequestData();
            return chai.request(app)
                .post('/api/requests')
                .send(newRequest)
                .then(function(res) {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('id', 'requestor', 'status', 'items', 'createdAt', 'updatedAt');
                    expect(res.body.id).to.not.be.null;
                    expect(res.body.requestor.id).to.equal(newRequest.requestor.toHexString());
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
                status: 'jkljkljkljkl',
                requestor: 'lmnop'
            };

            return Request
                .findOne()
                .then(function(request) {
                    updateData.id = request.id;

                    return chai.request(app)
                        .put(`/api/requests/${request.id}`)
                        .send(updateData);
                })
                .then(function(res) {
                    expect(res).to.have.status(204);
                    return Request.findById(updateData.id);
                })
                .then(function(request) {
                    expect(request.status).to.equal(updateData.status);
                    expect(request.requestor).to.not.equal(updateData.status);
                });
        });
    });

    describe('DELETE Endpoint', function() {
        it('should delete a request with a status of created', function() {
            const newRequestData = RequestHelper.generateRequestData();
            newRequestData.status = 'created';
            const request = Request.create(newRequestData);
            return Request.create(newRequestData)
                .then((request) => {
                    return chai.request(app)
                        .delete(`/api/requests/${request.id}`)
                        .then(function(res) {
                            expect(res).to.have.status(204);
                            return Request.findById(request.id);
                        })
                    then(function(_request) {
                        expect(_request).to.be.null;
                    });
                });
        });
    });
});