const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

class GeneralHelper {
    static tearDownDb() {
        console.warn('Deleting database');
        return mongoose.connection.dropDatabase();
    }

    static httpAuthenticated(app, url, method) {

        switch (method) {
            case 'post':
                return chai.request(app)
                    .post(url)
                    .set('X-TEST-BYPASS-AUTH', true);
                break;
            case 'get':
                return chai.request(app)
                    .get(url)
                    .set('X-TEST-BYPASS-AUTH', true);
                break;
            case 'put':
                return chai.request(app)
                    .put(url)
                    .set('X-TEST-BYPASS-AUTH', true);
                break;
            case 'delete':
                return chai.request(app)
                    .delete(url)
                    .set('X-TEST-BYPASS-AUTH', true);
                break;
            default:
                throw new Error('Invalid http verb');

        }

    }

}

module.exports = GeneralHelper;