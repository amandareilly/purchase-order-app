const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const Auth = require('./controllers/AuthController');
const cookieExtractor = require('./middleware/cookieExtractor');

const User = require('./models/User');
const { JWT_SECRET } = require('./config');

const localStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'email'
    },
    (email, password, done) => {
        User
            .find()
            .byEmail(email)
            .exec((err, user) => {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Invalid user.' });
                }
                return done(null, user);
            })
    });

const jwtStrategy = new JwtStrategy({
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
        algorithms: ['HS256']
    },
    (payload, done) => {
        done(null, payload.user);
    }
);

const bearerStrategy = new JwtStrategy({
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        algorithms: ['HS256']
    },
    (payload, done) => {
        done(null, payload.user);
    }
);

module.exports = { localStrategy, jwtStrategy, bearerStrategy };