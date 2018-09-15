const chai = require('chai');
const moment = require('moment');
const app = require('../../server/app');
const Request = require('../../server/models/Request');
const { runServer, closeServer } = require('../../server/server');
const { TEST_DATABASE_URL, TEST_PORT } = require('../../server/config');
const ItemHelper = require('../helpers/ItemHelper');
const GeneralHelper = require('../helpers/GeneralHelper');
const RequestHelper = require('../helpers/RequestHelper');
const { expect } = chai;


describe('Item API', function() {
    // starts the server before running tests
    before(function() {
        return runServer(TEST_DATABASE_URL, TEST_PORT);
    });

    // closes the server after running tests
    after(function() {
        return closeServer();
    });

    beforeEach(function() {
        return RequestHelper.seedRequestData(false);
    });

    afterEach(function() {
        return GeneralHelper.tearDownDb();
    });

    describe('POST Endpoint', function() {
        it('should add an item to the selected request', function() {
            const itemData = ItemHelper.generateItemData();
            return Request
                .findOne()
                .then(function(request) {
                    itemData.requestId = request.id;

                    return GeneralHelper.httpAuthenticated(app, `/api/requests/${request.id}/addItem`, 'post')
                        .send(itemData);
                })
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.id).to.equal(itemData.requestId);

                    const item = res.body.items[0];

                    expect(item).to.be.a('object');
                    expect(item).to.include.keys('id', 'name', 'qty', 'pricePer', 'neededBy', 'expeditedShipping', 'link', 'notes');
                });
        });
    });

    describe('DELETE Endpoint', function() {
        it('should delete an item from a request', function() {
            let requestId;
            const itemData = ItemHelper.generateItemData();
            return Request
                .findOne()
                .then(function(request) {
                    requestId = request.id;
                    itemData.requestId = requestId;

                    return GeneralHelper.httpAuthenticated(app, `/api/requests/${requestId}/addItem`, 'post')
                        .send(itemData);
                })
                .then(function(res) {
                    expect(res.body.items.length).to.equal(1);
                    const itemId = res.body.items[0].id;

                    return GeneralHelper.httpAuthenticated(app, `/api/requests/${requestId}/item/${itemId}`, 'delete');


                })
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res.body.id).to.equal(requestId);
                    expect(res.body.items.length).to.equal(0);
                });
        });
    });

    describe('UPDATE Endpoint', function() {
        it('should update an item', function() {
            let requestId;
            const itemData = ItemHelper.generateItemData();
            const updatedItem = ItemHelper.generateItemData();
            delete updatedItem.notes;

            return Request
                .findOne()
                .then(function(request) {
                    requestId = request.id;
                    itemData.requestId = requestId;

                    return GeneralHelper.httpAuthenticated(app, `/api/requests/${requestId}/addItem`, 'post')
                        .send(itemData);
                })
                .then(function(res) {

                    updatedItem.reqId = requestId;
                    updatedItem.itemId = res.body.items[0].id;

                    return GeneralHelper.httpAuthenticated(app, `/api/requests/${requestId}/item/${res.body.items[0].id}`, 'put')
                        .send(updatedItem);
                })
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.id).to.equal(requestId);

                    const item = res.body.items[0];

                    expect(item).to.be.a('object');
                    expect(item).to.include.keys('id', 'name', 'qty', 'pricePer', 'neededBy', 'expeditedShipping', 'link', 'notes');
                    expect(item.id).to.equal(updatedItem.itemId);
                    expect(item.name).to.equal(updatedItem.name);
                    expect(item.qty).to.equal(updatedItem.qty);
                    expect(item.pricePer).to.equal(updatedItem.pricePer);
                    expect(moment(item.neededBy).valueOf()).to.equal(moment(updatedItem.neededBy).valueOf());
                    expect(item.expeditedShipping).to.equal(updatedItem.expeditedShipping);
                    expect(item.link).to.equal(updatedItem.link);
                    expect(item.notes).to.equal(itemData.notes);
                });
        });
    })
});