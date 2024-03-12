require('dotenv').config();
const config = require('config');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const mysql = require('mysql2');

const cards = require('./routes/cards');
const decks = require('./routes/decks');
const cardTemplates = require('./routes/card_templates');
const users = require('./routes/users');
const home = require('./routes/home');

const express = require('express');
const app = express();


const connection = mysql.createConnection({
   host: config.get('dbHost'),
   database: config.get('dbName'),
   user: config.get('dbUser'),
   password: config.get('dbPass')
})

connection.connect((err) => {
   if (err) {
      debug('Error connecting to DB: ' + err.stack);
      return;
   }

   debug('Connected to DB');
});

connection.query('SELECT * FROM new_table', (err, rows, fields) =>{
   if (err) throw err;

   console.log(rows[0]);
})

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(express.static('public'));
app.use(helmet());

app.use('/cards', cards);
app.use('/decks', decks);
app.use('/card-templates', cardTemplates);
app.use('/users', users);
app.use('/', home);

if (app.get('env') === 'development') {
   app.use(morgan('tiny'));
   debug('Morgan enabled');
}

const port = config.get('port');
app.listen(port, () => {
   console.log(`${config.get('app_name')} listenting on port ${port}...`)
})