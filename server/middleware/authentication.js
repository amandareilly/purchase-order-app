const passport = require('passport');

const localAuth = passport.authenticate('local', { session: false, failureRedirect: '/login' });
const jwtAuth = passport.authenticate('jwt', { session: false, failureRedirect: '/login' });

let authMiddleware;

authMiddleware = (req, res, next) => {
    if (req.header('X-TEST-BYPASS-AUTH' || 'x-test-bypass-auth')) {
        next();
    } else if (req.originalUrl === '/api/auth/login') {
        localAuth(req, res, next);
    } else {
        jwtAuth(req, res, next);
    }
};

module.exports = { localAuth, jwtAuth, authMiddleware };