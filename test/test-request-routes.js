const chai = require('chai');
const chaiHttp = require('chai-http')

const { connectToDb, disconnectDb } = require('../server/server');
const app = require('../server/app');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Request Routes', function() {

    // starts the server before running tests
    before(function() {
        // return connectToDb();
    });

    // closes the server after running tests
    after(function() {
        //return disconnectDb();
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
            .get('/requests/new')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            });
    });

    // should receive 200 status and html when hitting /requests/:id
    it('/requests/123 should return status 200 and html on GET', function() {
        return chai.request(app)
            .get('/requests/123')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            });
    });
});