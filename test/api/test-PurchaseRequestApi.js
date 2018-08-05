const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server/app');
const PurchaseRequest = require('../../source/client-js/PurchaseRequest');

const { expect } = chai;
chai.use(chaiHttp);

describe('Purchase Request API', function() {
    it('Should return all existing requests', function() {
        return chai.request(app)
            .get('/api/requests')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
            });
    });

    it('Should get an existing request by id', function() {
        return chai.request(app)
            .get('/api/requests/1')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
            });
    });

    it('Should create a new request', function() {
        const newRequest = new PurchaseRequest(12345);
        return chai.request(app)
            .post('/api/requests')
            .send(newRequest)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('id', 'requestorId', 'createdAt', 'status', 'items');
                expect(res.body.id).to.not.equal(null);
                expect(res.body).to.deep.equal(Object.assign(newRequest, { id: res.body.id }));
            });
    });

    it('Should update an existing request on PUT', function() {
        const newData = {
            "id": 1,
            "requestorId": "67891",
            "requestorName": "Joe Blow",
            "createdAt": 1529798400,
            "status": "complete",
            "items": [{
                    "name": "Kleenex, 150ct Box",
                    "qty": 5,
                    "pricePer": 3.99,
                    "neededBy": 1532995200,
                    "expeditedShipping": false,
                    "notes": "Lorem ipsum dolor sit amet...",
                },
                {
                    "name": "Pens, 20ct box",
                    "qty": 8,
                    "pricePer": 7.82,
                    "neededBy": 1532995200,
                    "expeditedShipping": false,
                    "notes": "Lorem ipsum dolor sit amet...",
                },
            ],
        };
        return chai.request(app)
            .put(`/api/requests/${newData.id}`)
            .send(newData)
            .then(function(res) {
                expect(res).to.have.status(200)
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
            });
    });
});