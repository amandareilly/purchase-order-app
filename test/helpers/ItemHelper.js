const faker = require('faker');

class ItemHelper {
    static generateItemData() {
        return {
            name: faker.commerce.productName(),
            qty: faker.random.number({ min: 1, max: 10 }),
            pricePer: faker.commerce.price(),
            neededBy: faker.date.future(),
            expeditedShipping: faker.random.boolean(),
            link: faker.internet.url(),
            notes: faker.lorem.paragraph()
        };
    }
}

module.exports = ItemHelper;