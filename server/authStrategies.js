const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const Auth = require('./controllers/AuthController');

const User = require('./models/User');
const { JWT_SECRET } = require('./config');

const localStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'email'
    },
    (email, empty, callback) => {
        console.log("Email: ", email, "Empty: ", empty);
        let user;
        User
            .find()
            .byEmail(email)
            .then(_user => {
                console.log("_user: ", _user);
                if (_user) {
                    user = _user.serialize();
                    return callback(null, user);
                } else {
                    throw new Error('User not found.');
                }
            })
            .catch(err => {
                if (err.reason === 'LoginError') {
                    return callback(null, false, err);
                }
                return callback(err, false);
            });

    });

const jwtStrategy = new JwtStrategy({
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        algorithms: ['HS256']
    },
    (payload, done) => {
        done(null, payload.user);
    }
);

module.exports = { localStrategy, jwtStrategy };