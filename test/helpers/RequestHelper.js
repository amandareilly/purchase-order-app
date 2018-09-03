const faker = require('faker');
const Request = require('../../server/models/Request');
const mongoose = require('mongoose');
const UserHelper = require('./UserHelper');
const User = require('../../server/models/User');

class RequestHelper {
    static seedRequestData(withItems = true) {
        const userData = UserHelper.generateUserData();
        userData._id = mongoose.Types.ObjectId('5b70f8d709110643dc2320c8');
        User.create(userData);
        console.info('seeding request data');
        const seedData = [];
        for (let i = 1; i <= 10; i++) {
            seedData.push(this.generateRequestData(withItems));
        }
        return Request.insertMany(seedData);
    }

    static generateRequestData(withItems = true) {
        return {
            requestor: mongoose.Types.ObjectId('5b70f8d709110643dc2320c8'),
            status: RequestHelper.generateRequestStatus(),
            items: (withItems ? RequestHelper.generateItems() : [])
        };
    }

    static generateRequestStatus() {
        const statuses = ['created', 'submitted', 'processed', 'complete'];
        return statuses[Math.floor(Math.random() * 4)];
    }

    static generateItems() {
        const numItems = Math.max(1, Math.floor(Math.random() * 5));
        const items = [];
        for (let i = 0; i < numItems; i++) {
            items.push(this.generateItem());
        }
        return items;
    }

    static generateItem() {
        return {
            name: faker.commerce.productName(),
            qty: faker.random.number({ min: 1, max: 10 }),
            pricePer: faker.commerce.price(),
            neededBy: faker.date.future(),
            expeditedShipping: faker.random.boolean()
        };
    }
}

module.exports = RequestHelper;