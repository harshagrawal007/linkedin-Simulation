var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'linkedin.cdlsepyst744.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'cmpe_273_homeaway'
})


module.exports = pool;