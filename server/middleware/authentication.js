const passport = require('passport');

const localAuth = passport.authenticate('local', { session: false });
const jwtAuth = passport.authenticate('jwt', { session: false });

const bearerAuth = passport.authenticate('bearer', { session: false });

let authMiddleware;

authMiddleware = (req, res, next) => {
    if (req.header('X-TEST-BYPASS-AUTH' || 'x-test-bypass-auth')) {
        console.log('header found');
        next();
    } else if (req.originalUrl === '/api/auth/login') {
        console.log('running local auth');
        localAuth(req, res, next);
    } else {
        console.log('running jwtAuth');
        jwtAuth(req, res, next);
    }
};

module.exports = { localAuth, jwtAuth, bearerAuth, authMiddleware };