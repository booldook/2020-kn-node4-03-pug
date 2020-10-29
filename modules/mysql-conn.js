const mysql = require('mysql2/promise');
const pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'booldook',
	database: 'booldook',
	password: '000000',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

module.exports = { mysql, pool };