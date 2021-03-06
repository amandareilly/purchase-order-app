const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const itemSchema = require('./Item');
const vendorSchema = require('./Vendor');
const Sequence = require('./Sequence');

const requestSchema = mongoose.Schema({
    sequence: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
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

requestSchema.pre('validate', function(next) {
    if (!this.sequence) {
        return Sequence.findOne()
            .then((sequence) => {
                this.sequence = sequence.getNextSequence();
            });
    }
    next();
});

requestSchema.post('save', function(doc, next) {
    doc.populate('requestor')
        .execPopulate()
        .then(function() {
            next()
        });
});

requestSchema.virtual('requestTotal').get(function() {
    let total = 0;
    this.items.forEach(function(item) {
        total += item.lineTotal;
    });
    return total;
})

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
        sequence: this.sequence,
        requestor: requestor,
        vendor: (this.vendor !== undefined ? this.vendor.serialize() : null),
        status: this.status,
        items: serializedItems,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        notes: (this.notes ? this.notes : null),
        requestTotal: this.requestTotal.toFixed(2),
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

requestSchema.query.byRequestor = function(userId) {
    if (!userId) {
        return this.find();
    } else {
        return this.find({ requestor: userId });
    }
}

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;