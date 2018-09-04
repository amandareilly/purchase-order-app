require('isomorphic-fetch');

const SharedApi = require('../api/SharedApi');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

class Auth {
    // check to see if email exists and create user if it does not

    static loginForm(req, res) {
        console.log("hit login form")
        res.render('login');
    }

    static processEmail(req, res) {
        const email = req.body.email;
        console.log('email');
        let url = SharedApi.constructApiUrl(req, 'users/byEmail/' + email);
        fetch(url)
            .then((response) => {
                if (response.status === 204) {
                    return Auth.createUser(req);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log("Data: ", data);
                const authToken = Auth.createAuthToken(data);
                res.cookie('jwt', authToken).end();
            });
    }

    static createUser(req) {
        const url = SharedApi.constructApiUrl(req, 'users');
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: req.body.email,
            role: ("role" in req.body ? req.body.role : "basic")
        };
        return fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .catch(error => console.error('Fetch Error: ', error));
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
        const authToken = Auth.createAuthToken(user);
        return res.json({ authToken });
    }

    static redirect(req, res) {
        console.log("redirect", "/n", " ");
        console.log(req);
    }
}

module.exports = Auth;;