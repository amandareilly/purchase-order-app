const chai = require('chai');
const app = require('../../server/app');
const { runServer, closeServer } = require('../../server/server');
const { TEST_DATABASE_URL, TEST_PORT, API_URL } = require('../../server/config');
const User = require('../../server/models/User');
const GeneralHelper = require('../helpers/GeneralHelper');
const UserHelper = require('../helpers/UserHelper');

const { expect } = chai;

describe('User API', function() {
    // starts the server before running tests
    before(function() {
        return runServer(TEST_DATABASE_URL, TEST_PORT);
    });

    // closes the server after running tests
    after(function() {
        return closeServer();
    });

    beforeEach(function() {
        return UserHelper.seedUserData();
    });

    afterEach(function() {
        return GeneralHelper.tearDownDb();
    });

    describe('GET Endpoints', function() {
        let res;
        it('Should return all existing users', function() {
            return GeneralHelper.httpAuthenticated(app, '/api/users', 'get')
                .then(function(_res) {
                    // so subsequent .then blocks can access response object
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.users).to.have.lengthOf.at.least(1);
                    return User.countDocuments();
                })
                .then(count => {
                    expect(res.body.users).to.have.lengthOf(count);
                });
        });

        it('Should return users with the correct fields', function() {
            let resUser;
            return GeneralHelper.httpAuthenticated(app, '/api/users', 'get')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.users).to.be.a('array');
                    expect(res.body.users).to.have.lengthOf.at.least(1);

                    res.body.users.forEach(function(user) {
                        expect(user).to.be.a('object');
                        expect(user).to.include.keys('id', 'role', 'email');
                    });

                    resUser = res.body.users[0];
                    return User.findById(resUser.id);
                })
                .then(function(user) {
                    expect(resUser.id).to.equal(user.id);
                    expect(resUser.role).to.equal(user.role);
                    expect(resUser.email).to.equal(user.email);

                    return User.find().byEmail(resUser.email);
                })
                .then(function(user) {
                    expect(resUser.id).to.equal(user.id);
                    expect(resUser.role).to.equal(user.role);
                    expect(resUser.email).to.equal(user.email);
                });
        });
    });
});