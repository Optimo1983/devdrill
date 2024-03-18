require('dotenv').config();

const config = require('config');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const authentication = require('./middleware/authentication');

// Sessions setup
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./database/db');
const sessionStore = new MySQLStore({}, db.getPool().promise());

const cards = require('./routes/cards');
const decks = require('./routes/decks');
const cardTemplates = require('./routes/card_templates');
const users = require('./routes/users');
const home = require('./routes/home');

const express = require('express');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(logger);
app.use(authentication);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
   secret: config.get('session.secret'),
   resave: false,
   saveUninitialized: true,
   cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
   store: sessionStore
}));
app.use(helmet());
if (app.get('env') === 'development') {
   app.use(morgan('tiny'));
   debug('Morgan enabled');
}

// Routes
app.use('/cards', cards);
app.use('/decks', decks);
app.use('/card-templates', cardTemplates);
app.use('/users', users);
app.use('/', home);

const port = config.get('port');
app.listen(port, () => {
   debug(`${config.get('app_name')} listenting on port ${port}...`);
});