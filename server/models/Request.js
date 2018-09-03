const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const itemSchema = require('./Item');

const requestSchema = mongoose.Schema({
    requestor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, required: true, default: 'created', trim: true, lowercase: true },
    items: [itemSchema]
}, { timestamps: true });

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
    const requestor = {
        id: 'Unknown',
        name: 'Unknown',
        email: 'Unknown',
    };
    if (this.requestor) {
        if (this.requestor.id) {
            requestor.id = this.requestor._id;
        } else {
            requestor.id = this.requestor;
        }
        if (this.requestor.email) {
            requestor.email = this.requestor.email;
        }
        if (this.requestor.name) {
            requestor.name = `${this.requestor.name.first} ${this.requestor.name.last}`;
        }
    }

    const serializedItems = [];
    this.items.forEach((item) => {
        serializedItems.push(item.serialize());
    });

    return {
        id: this._id,
        requestor: requestor,
        status: this.status,
        items: serializedItems,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
};
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;