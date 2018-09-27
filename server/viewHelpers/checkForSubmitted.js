const checkForSubmitted = function(conditional, options) {
    if (conditional == "submitted") {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
};

module.exports = checkForSubmitted;