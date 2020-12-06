const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ipman123',
  database: 'login'
});

module.exports = connection;
