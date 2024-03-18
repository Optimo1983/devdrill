const mysql = require('mysql2');
const config = require('config');

const pool = mysql.createPool({
   connectionLimit: config.get('db.connection_limit'),
   host: config.get('db.host'),
   database: config.get('db.name'),
   user: config.get('db.user'),
   password: config.get('db.pass')
})

module.exports = {
   query: (text, params, callback) => {
      return pool.query(text, params, callback);
   },
   
   getPool: () => {
      return pool;
   }
}