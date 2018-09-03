const mongoose = require('mongoose');
class GeneralHelper {
    static tearDownDb() {
        console.warn('Deleting database');
        return mongoose.connection.dropDatabase();
    }
}

module.exports = GeneralHelper;