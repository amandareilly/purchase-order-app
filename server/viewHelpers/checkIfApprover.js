const checkIfApprover = function(unused, options) {
    if (options.data.root.user.role.toUpperCase() === 'APPROVER') {
        return options.fn(this);
    } else {
        if (options.inverse) {
            return options.inverse(this);
        }
    }
};

module.exports = checkIfApprover;