const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const vendorSchema = mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String },
    phone: { type: String },
    contactName: { type: String },
    notes: { type: String }
});

vendorSchema.methods.serialize = function() {

    const vendorObject = {
        id: this.id,
        name: this.name,
    };
    const optionalKeys = ['url', 'phone', 'contactName', 'notes'];
    const vendor = this;
    optionalKeys.forEach(function(key) {
        if (vendor[key]) {
            vendorObject[key] = vendor[key];
        } else {
            vendorObject[key] = null;
        }
    });

    return vendorObject;
}

// only export the schema because this will
// only be used as a nested sub-document
module.exports = vendorSchema;