const SharedApi = require('../api/SharedApi');

function checkIfApprover(req, res, next) {
    return SharedApi.getUser(req)
        .then((user) => {
            return (req, res, next) => {
                if (!user) {
                    res.status(400).json({ message: 'Bad request' });
                } else if (user.role.toUpperCase() == 'APPROVER') {
                    next();
                } else {
                    res.status(403).json({ message: 'Forbidden' });
                }
            }
        })
}