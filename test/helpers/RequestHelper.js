const faker = require('faker');
const Request = require('../../server/models/Request');
const mongoose = require('mongoose');
const UserHelper = require('./UserHelper');
const User = require('../../server/models/User');
const Sequence = require('../../server/models/Sequence');
let sequenceNum = 0;

class RequestHelper {

    static seedRequestData(withItems = true) {
        const userData = UserHelper.generateUserData();
        userData._id = mongoose.Types.ObjectId('5b70f8d709110643dc2320c8');

        const sequenceData = {
            sequenceType: 'requests',
            sequenceYear: new Date().getFullYear(),
            sequenceNum: 9999
        };
        return User.create(userData).then(() => {
            return Sequence.create(sequenceData)
                .then(() => {
                    console.info('seeding request data');
                    const seedData = [];
                    for (let i = 1; i <= 10; i++) {
                        seedData.push(this.generateRequestData(withItems));
                    }
                    return Request.insertMany(seedData);
                });
        });
    }

    static generateRequestData(withItems = true, apiFormat = false) {
        const zero = '0';
        const fillDigits = zero.repeat(4 - sequenceNum.toString().length);
        const thisSeq = `${new Date().getFullYear()}-${fillDigits}${sequenceNum}`;
        sequenceNum++;
        const requestData = {
            sequence: thisSeq,
            requestor: mongoose.Types.ObjectId('5b70f8d709110643dc2320c8'),
            status: RequestHelper.generateRequestStatus(),
            items: (withItems ? RequestHelper.generateItems() : []),
            vendor: RequestHelper.generateVendor(),
            notes: faker.lorem.paragraph(),
        };
        if (apiFormat) {
            requestData.vendorName = requestData.vendor.name;
            delete requestData.vendor;
        }

        return requestData;
    }

    static generateRequestStatus() {
        const statuses = ['created', 'submitted', 'approved', 'denied', 'ordered', 'complete'];
        return statuses[Math.floor(Math.random() * 6)];
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

    static generateVendor() {
        return {
            name: faker.company.companyName(),
            url: faker.internet.url(),
            phone: faker.phone.phoneNumber(),
            contactName: faker.name.findName(),
            notes: faker.lorem.paragraph(),
        }
    }
}
module.exports = RequestHelper;