const checkForComplete = function(conditional, options) {
    if (conditional === 'complete') {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
};

module.exports = checkForComplete;