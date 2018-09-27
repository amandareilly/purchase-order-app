const faker = require('faker');
const Sequence = require('./models/Sequence');
const Request = require('./models/Request');
const User = require('./models/User');

const vendorArray = [];
let userArray = [];
const requestData = [];
let sequenceNum = 0;

class SeedData {
    static seedData(req, res) {
        User.db.dropDatabase();
        SeedData.generateUserArray();
        return User.insertMany(userArray)
            .then((insertedUsers) => {
                userArray = insertedUsers;

                SeedData.generateVendorArray(15);
                for (let i = 0; i < 100; i++) {
                    requestData.push(SeedData.generateRequestData());
                }
                return Sequence.create({ sequenceType: 'request', sequenceNum: sequenceNum });
            })
            .then(() => {
                return Request.insertMany(requestData);
            })
            .then(() => {
                console.log('success');
                res.status(200).send();
            })
    }

    static generateRequestData() {
        sequenceNum++;
        const zero = '0';
        const fillDigits = zero.repeat(4 - sequenceNum.toString().length);
        const thisSeq = `${new Date().getFullYear()}-${fillDigits}${sequenceNum}`;
        const createDate = faker.date.recent(30);
        return {
            sequence: thisSeq,
            requestor: SeedData.generateRequestUser(),
            status: SeedData.generateRequestStatus(),
            items: SeedData.generateItems(),
            vendor: SeedData.generateRequestVendor(),
            notes: faker.lorem.paragraph(),
            createdAt: createDate,
            updatedAt: createDate
        }
    }

    static generateRequestVendor() {
        return vendorArray[Math.floor(Math.random() * vendorArray.length)]
    }

    static generateVendorArray(num) {
        for (let i = 0; i < num; i++) {
            vendorArray.push(SeedData.generateVendor());
        }
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

    static generateUserArray() {
        userArray.push({
            name: {
                first: 'Basic',
                last: 'User1'
            },
            role: 'basic',
            email: 'basic1@testapp.test'
        });
        userArray.push({
            name: {
                first: 'Basic',
                last: 'User2'
            },
            role: 'basic',
            email: 'basic2@testapp.test'
        });
        userArray.push({
            name: {
                first: 'Basic',
                last: 'User3'
            },
            role: 'basic',
            email: 'basic3@testapp.test'
        });
        userArray.push({
            name: {
                first: 'Basic',
                last: 'User4'
            },
            role: 'basic',
            email: 'basic4@testapp.test'
        });
        userArray.push({
            name: {
                first: 'Approver',
                last: 'User'
            },
            role: 'approver',
            email: 'approver1@testapp.test'
        });
    }

    static generateRequestUser() {
        const users = userArray.filter(user => user.role === 'basic');
        return users[Math.floor(Math.random() * users.length)]._id;
    }

    static generateRequestStatus() {
        const statuses = ['created', 'submitted', 'approved', 'denied', 'complete', 'ordered'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    static generateItems() {
        const numItems = Math.max(1, Math.floor(Math.random() * 15));
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
            expeditedShipping: faker.random.boolean(),
            link: faker.internet.url(),
            notes: faker.lorem.sentence()
        };
    }
}

module.exports = SeedData;