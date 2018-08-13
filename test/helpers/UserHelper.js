const faker = require('faker');
const User = require('../../server/models/User');

class UserHelper {
    static seedUserData() {
        console.info('seeding user data');
        const seedData = [];
        for (let i = 1; i <= 10; i++) {
            seedData.push(this.generateUserData());
        }
        return User.insertMany(seedData);
    }

    static generateUserRole() {
        const roles = ['basic', 'purchaser', 'approver', 'admin'];
        return roles[Math.floor(Math.random() * 4)];
    }

    static generateUserData() {
        return {
            name: {
                first: faker.name.firstName(),
                last: faker.name.lastName(),
            },
            role: this.generateUserRole(),
            email: faker.internet.email()
        };
    }
}

module.exports = UserHelper;