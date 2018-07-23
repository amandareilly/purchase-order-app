const chai = require('chai');
const chaiHttp = require('chai-http')

const { app, runServer, closeServer } = require('../source/js/server/server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Root URL', function() {

    // starts the server before running tests
    before(function() {
        return runServer();
    });

    // closes the server after running tests
    after(function() {
        return closeServer();
    });

    // should receive 200 status and html when hitting root
    it('should return status 200 and html on GET', function() {
        return chai.request(app)
            .get('/')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            });
    });
});