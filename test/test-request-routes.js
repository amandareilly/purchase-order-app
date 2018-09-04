const chai = require('chai');
const chaiHttp = require('chai-http')
const { TEST_DATABASE_URL, TEST_PORT } = require('../server/config');
const { runServer, closeServer } = require('../server/server');
const app = require('../server/app');
const RequestHelper = require('./helpers/RequestHelper');
const GeneralHelper = require('./helpers/GeneralHelper');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Purchase Request Routes', function() {

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

    // should receive 200 status and html when hitting /requests
    it('/requests should return status 200 and html on GET', function() {
        return chai.request(app)
            .get('/requests')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            });
    });

    // should receive 200 status and html when hitting /requests/new
    it('/requests/new should return status 200 and html on GET', function() {
        return chai.request(app)
            .post('/requests/new')
            .send({ vendorName: 'Test Vendor' })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            });
    });

    // should receive 200 status and html when hitting /requests/:id
    it('/requests/5b70f8d709110643dc2320c8 should return status 200 and html on GET', function() {
        return chai.request(app)
            .get('/requests/5b70f8d709110643dc2320c8')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            });
    });
});