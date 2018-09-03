require('isomorphic-fetch');

const SharedApi = require('../api/SharedApi');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

class Auth {
    // check to see if email exists and create user if it does not
    static processEmail(req, res, next) {
        const email = req.body.email;
        let url = SharedApi.constructApiUrl(req, 'users/byEmail/' + email);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    data = Auth.createUser(req);
                }
                return data;
            })
            .then(data => {
                url = SharedApi.constructApiUrl(req, 'auth/login/');
                const requestBody = {
                    email: email
                };

                return fetch(url, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    })
                    .then(response => {
                        res.locals.authToken = response.headers.get('Auth-Token');
                        res.locals.user = data;
                        next();
                    });
            });
    }

    static createUser(req) {
        const url = SharedApi.constructApiUrl(req, 'users');
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: req.body.email,
            role: "basic"
        };
        return fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(response => { return response; })
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
        return res.set('Auth-Token', authToken).status(202).send({ authToken });
    }
}

module.exports = Auth;