const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b20dbd516a35b6',
    database: 'heroku_0d20360d2bb8df3',
    password: '2d550b2e'
});
console.log("created data connection");

module.exports = pool.promise();