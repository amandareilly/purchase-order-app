const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieSession = require('cookie-session');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const requestRouter = require('./routes/requestRouter');
const apiRouter = require('./routes/apiRouter');
const authRouter = require('./routes/authRouter');
const passport = require('passport');
const app = express();

const { localStrategy, jwtStrategy } = require('./authStrategies');

passport.use(jwtStrategy);
passport.use(localStrategy);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
// app.use(morgan('default'));
app.use(cookieParser());

// handlebars view engine setup
const hbs = exphbs.create({
    extname: 'hbs',
    layoutsDir: 'public/views/layouts',
    partialsDir: 'public/views/partials',
    defaultLayout: 'main',
    helpers: {
        dateFormat: require('handlebars-dateformat'),
        capitalizeFirstLetter: require('./viewHelpers/capitalizeFirstLetter'),
        prettifyTrueFalse: require('./viewHelpers/prettifyTrueFalse'),
        checkForSubmitted: require('./viewHelpers/checkForSubmitted'),
        checkForApproved: require('./viewHelpers/checkForApproved')
    },
});

app.set('views', path.resolve(__dirname, '../', 'public/views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Root URL
app.get('/', (req, res) => res.render('home', { loggedIn: true }));

// Request Routes
app.use('/requests', requestRouter);

// Login and Auth
app.use('/login', authRouter);

// API Routes
app.use('/api', apiRouter);

module.exports = app;