const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();


app.use(express.static('public'));

// handlebars view engine setup
const hbs = exphbs.create({
    extname: 'hbs',
    layoutsDir: 'public/views/layouts',
    defaultLayout: 'main'
});

app.set('views', path.resolve(__dirname, '../', 'public/views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Root URL
app.get('/', function(req, res) {
    res.render('home');
});

module.exports = app;