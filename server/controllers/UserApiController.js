const SharedApi = require('../api/SharedApi');
const User = require('../models/User');

class UserApi {
    static createUser(req, res) {
        const validate = SharedApi.checkForRequiredFields(
            ['email'], req.body
        );
        if (validate) {
            res.status(400).send(validate);
        }

        User
            .create({
                role: req.body.role || 'basic',
                email: req.body.email,
                name: {
                    first: req.body.firstName || 'Unknown',
                    last: req.body.lastName || 'Name'
                }
            })
            .then(user => res.status(201).json(user.serialize()))
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error.' });
            });
    }

    static getAllUsers(req, res) {
        User
            .find()
            .then(users => {
                res.json({
                    users: users.map(
                        (user) => user.serialize()
                    )
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    }

    static getUserById(req, res) {
        User
            .findById(req.params.id)
            .then(user => res.json(user.serialize()))
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    }

    static getUserByEmail(req, res) {
        User
            .find()
            .byEmail(req.params.email)
            .then(user => res.json(user.serialize()))
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    }
}

module.exports = UserApi;