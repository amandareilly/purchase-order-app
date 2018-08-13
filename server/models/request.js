const mongoose = require('mongoose');
const itemSchema = require('./Item');

const requestSchema = mongoose.Schema({
    requestor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, required: true, default: 'created', trim: true, lowercase: true },
    items: [itemSchema]
}, { timestamps: true });

requestSchema.pre('find', function() {
    this.populate('requestor', '_id, fullName email');
});

requestSchema.methods.serialize = function() {
    return {
        id: this._id,
        requestor: {
            id: this.requestor.id,
            name: this.requestor.fullName,
            email: this.requestor.email
        },
        status: this.status,
        items: this.items,
    }
};

requestSchema.methods.addItem = function(itemObject) {
    this.items.push(itemObject);
    this.save(function(err) {
        if (err) {
            return handleError(err);
        }
        console.log(`Item ${itemObject.name} added.`);
    });
}

requestSchema.methods.removeItem = function(id) {
    this.items.id(id).remove();
    this.save(function(err) {
        if (err) {
            return handleError(err);
        }
        console.log(`Item #${id} was removed.`);
    });
}

requestSchema.methods.getItem = function(id) {
    return this.items.id(id);
}

requestSchema.methods.updateItem = function(updatedItem) {
    const item = this.items.id(updatedItem._id);
    item.set(updatedItem);
    this.save(function(err) {
        if (err) {
            return handleError(err);
        }
        console.log(`Item #${updatedItem._id} was updated.`);
    });
}

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;