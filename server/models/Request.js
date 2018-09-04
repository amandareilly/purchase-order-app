const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const itemSchema = require('./Item');
const vendorSchema = require('./Vendor');

const requestSchema = mongoose.Schema({
    requestor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vendor: { type: vendorSchema, required: true },
    status: { type: String, required: true, default: 'created', trim: true, lowercase: true },
    items: [itemSchema],
    notes: { type: String }
}, { timestamps: true });

requestSchema.virtual('vendorName')
    .get(function() { return this.vendor.name; })
    .set(function(v) { this.vendor.name = v; });

requestSchema.pre('find', function(next) {
    this.populate('requestor');
    next();
});

requestSchema.post('save', function(doc, next) {
    doc.populate('requestor')
        .execPopulate()
        .then(function() {
            next()
        });
});

requestSchema.methods.serialize = function() {
    const requestor = {};
    if (this.requestor) {
        requestor.id = (this.requestor.id ? this.requestor.id : this.requestor);
        requestor.email = (this.requestor.email ? this.requestor.email : 'Unknown');
        requestor.name = (this.requestor.name ? `${this.requestor.name.first} ${this.requestor.name.last}` : 'Unknown');
    } else {
        requestor.id = 'Unknown';
        requestor.email = 'Unknown';
        requestor.name = 'Unknown';
    }

    const serializedItems = [];
    this.items.forEach((item) => {
        serializedItems.push(item.serialize());
    });

    return {
        id: this._id,
        requestor: requestor,
        vendor: (this.vendor !== undefined ? this.vendor.serialize() : null),
        status: this.status,
        items: serializedItems,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        notes: (this.notes ? this.notes : null),
    }
};

requestSchema.query.byStatus = function(statusArray) {
    if (!statusArray) {
        return this.find();
    } else {
        const orConditions = [];
        statusArray.forEach(function(status) {
            let condition = { status: status };
            orConditions.push(condition);
        });
        return this.find({ $or: orConditions });
    }
}
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;