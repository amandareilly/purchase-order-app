const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const itemSchema = mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true, default: 1, min: 1 },
    pricePer: { type: Number, min: 0 },
    neededBy: { type: Date, min: Date.now },
    expeditedShipping: { type: Boolean, required: true, default: false },
    link: { type: String },
    notes: { type: String }
});

itemSchema.methods.serialize = function() {
    let link = null;
    let notes = null;
    if (this.link) {
        link = this.link;
    }
    if (this.notes) {
        notes = this.notes;
    }

    return {
        id: this._id,
        name: this.name,
        qty: this.qty,
        pricePer: this.pricePer.toFixed(2),
        neededBy: this.neededBy,
        expeditedShipping: this.expeditedShipping,
        link: link,
        notes: notes,
    };
}

// only export the schema because this will
// only be used as a nested sub-document
module.exports = itemSchema;