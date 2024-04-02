require('dotenv').config();
const db = require('./db');
const tables = require('./schemaQueries');

const initializeSchema = async function() {
   for (let table in tables) {
      db.query(tables[table], [], (err, result) => {
         if (err) return console.log(err);
         console.log(result);
      })
   }
}

initializeSchema();
process.exit();