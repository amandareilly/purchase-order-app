const checkForSubmitted = function(conditional, options) {
    if (conditional !== "created") {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
};

module.exports = checkForSubmitted;