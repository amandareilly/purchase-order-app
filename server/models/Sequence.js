const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const sequenceSchema = mongoose.Schema({
    sequenceType: { type: String, required: true, unique: true },
    sequenceYear: { type: Number, required: true, min: 2018, default: new Date().getFullYear() },
    sequenceNum: { type: Number, required: true, min: 0, default: 0 },
});

sequenceSchema.methods.getNextSequence = function(minDigits = 4) {
    const currentYear = new Date().getFullYear();
    if (this.sequenceYear !== currentYear) {
        this.sequenceYear = currentYear;
        this.sequenceNum = 1;
    } else {
        this.sequenceNum++;
    }
    let nextSequence;
    const numLength = this.sequenceNum.toString().length;
    if (numLength < minDigits) {
        const zero = '0';
        nextSequence = `${this.sequenceYear}-${zero.repeat(minDigits - numLength)}${this.sequenceNum}`;
    } else {
        nextSequence = `${this.sequenceYear}-${this.sequenceNum}`;
    }

    this.save();
    return nextSequence;
}

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;