require('isomorphic-fetch');

const SharedApi = require('../api/SharedApi');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

class Auth {
    // check to see if email exists and create user if it does not

    static loginForm(req, res) {
        res.render('login');
    }

    static createAuthToken(user) {
        return jwt.sign({ user }, JWT_SECRET, {
            subject: user.email,
            expiresIn: JWT_EXPIRY,
            algorithm: 'HS256'
        });
    }

    static issueToken(req, res) {
        const user = req.user;
        req.session.user = user;
        const authToken = Auth.createAuthToken(user);
        res.cookie('jwt', authToken);
        res.clearCookie('userId')
        res.clearCookie('user').redirect('/requests');
    }
}

module.exports = Auth;