const checkForApproved = function(conditional, options) {
    if (conditional == "approved") {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
};

module.exports = checkForApproved;