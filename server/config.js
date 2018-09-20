exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/purchase-order-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/test-purchase-order-app';
exports.PORT = process.env.PORT || 8080;
exports.TEST_PORT = process.env.TEST_PORT || 8080;
exports.API_URL = process.env.API_URL || 'http://localhost:8080/api/';
exports.JWT_SECRET = process.env.JWT_SECRET || 'The quick brown fox jumped over the lazy dog.';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';