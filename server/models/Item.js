const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const itemSchema = mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true, default: 1, min: 1 },
    pricePer: { type: Number, min: 0 },
    neededBy: { type: Date, min: Date.now },
    expeditedShipping: { type: Boolean, required: true, default: false },
});

// only export the schema because this will
// only be used as a nested sub-document
module.exports = itemSchema;