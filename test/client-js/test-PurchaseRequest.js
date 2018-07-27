import PurchaseRequest from '../../source/client-js/classes/PurchaseRequest';
const chai = require('chai');
chai.use(require('chai-datetime'));

const expect = chai.expect;


describe('Client Side Purchase Requests', () => {
    it('creates a new purchase request', () => {
        const user = 'aaaaaaaa';
        const testRequest = new PurchaseRequest(user);
        const currentTime = Date.now();

        expect(testRequest).to.be.an.instanceOf(PurchaseRequest);
        expect(testRequest).to.have.all.keys('requestorId', 'requestorName', 'createdAt', 'status', 'items');
        expect(testRequest.requestorId).to.equal(user);
        expect(testRequest.createdAt).to.equal(currentTime);
        expect(testRequest.status).to.equal('created');
        expect(testRequest.items).to.be.an.instanceof(Array);
        expect(testRequest.items.length).to.equal(0);
    });

    it('correctly gets and initializes an existing request', () => {
        const requestId = 1;
        const testRequest = PurchaseRequest.getRequestById(requestId);

        expect(testRequest).to.be.an.instanceOf(PurchaseRequest);
        expect(testRequest).to.have.all.keys('id', 'requestorId', 'requestorName', 'createdAt', 'status', 'items');
        expect(testRequest.id).to.equal(requestId);
        expect(testRequest.items).to.be.an.instanceOf(Array);
        expect(testRequest.items.length).to.be.above(0);

    });

    it('correctly adds an item to the items property', () => {
        const testRequest = new PurchaseRequest('aaaaaa');
        const itemName = 'test item';
        const qty = '1';
        const price = '5';
        const neededBy = Date.now();
        const expeditedShipping = false;

        testRequest.addItem(itemName, qty, price, neededBy, expeditedShipping);

        expect(testRequest.items.length).to.equal(1);
        expect(testRequest.items[0]).to.have.all.keys('id', 'name', 'qty', 'pricePer', 'neededBy', 'expeditedShipping');
        expect(testRequest.items[0].name).to.equal(itemName);
        expect(testRequest.items[0].qty).to.equal(qty);
        expect(testRequest.items[0].pricePer).to.equal(price);
        expect(testRequest.items[0].neededBy).to.equal(neededBy);
        expect(testRequest.items[0].expeditedShipping).to.equal(expeditedShipping);
    });

    it('correctly removes an item from the items property', () => {
        const requestData = {
            "id": 1,
            "requestorId": "aaaaaaa",
            "requestorName": "John Smith",
            "createdAt": 1529798400,
            "status": "complete",
            "items": [{
                    "id": 1529798401,
                    "name": "Kleenex, 150ct Box",
                    "qty": 5,
                    "pricePer": 3.99,
                    "neededBy": 1532995200,
                    "expeditedShipping": false,
                    "notes": "Lorem ipsum dolor sit amet...",
                },
                {
                    "id": 1529798402,
                    "name": "Pens, 20ct box",
                    "qty": 8,
                    "pricePer": 7.82,
                    "neededBy": 1532995200,
                    "expeditedShipping": false,
                    "notes": "Lorem ipsum dolor sit amet...",
                },
            ],
        };
        const itemId = 1529798401;
        const testRequest = new PurchaseRequest('aaaaaaa', requestData);

        expect(testRequest.items.length).to.equal(2);
        testRequest.removeItem(itemId);

        expect(testRequest.items.length).to.equal(1);
        expect(testRequest.findItemById(itemId)).to.equal(-1);
    });

    it('should change request staus', () => {
        const testRequest = new PurchaseRequest('aaaaaaa');
        testRequest.setStatus('reviewed');
        expect(testRequest.status).to.equal('reviewed');
    });

    it('should save a request', () => {
        const requestData = {
            "id": 123456,
            "requestorId": "aaaaaaa",
            "requestorName": "John Smith",
            "createdAt": 1529798400,
            "status": "complete",
            "items": [{
                    "id": 1529798401,
                    "name": "Kleenex, 150ct Box",
                    "qty": 5,
                    "pricePer": 3.99,
                    "neededBy": 1532995200,
                    "expeditedShipping": false,
                    "notes": "Lorem ipsum dolor sit amet...",
                },
                {
                    "id": 1529798402,
                    "name": "Pens, 20ct box",
                    "qty": 8,
                    "pricePer": 7.82,
                    "neededBy": 1532995200,
                    "expeditedShipping": false,
                    "notes": "Lorem ipsum dolor sit amet...",
                },
            ],
        };

        const testRequest = new PurchaseRequest(null, requestData);
        testRequest.save();

        expect(PurchaseRequest.getRequestById(requestData.id)).to.deep.equal(testRequest);
    });
});