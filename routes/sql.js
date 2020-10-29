const express = require('express');
const router = express.Router();

/** mysql *************************/
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'booldook',
	port: 3306,
	password: '000000',
	database: 'booldook'
});

router.get('/create', (req, res, next) => {
	const pug = {title: "도서등록", scriptFile: ""};
	res.render('./book/create.pug', pug);
});

/* router.post('/save', (req, res, next) => {
	const { title, content, isbn, writer, wdate, price } = req.body;
	const sql = `
	INSERT INTO books SET 
	title 	= '${title}',
	content = '${content}',
	isbn 		= '${isbn}',
	writer 	= '${writer}',
	wdate 	= '${wdate}',
	price 	= '${price}' `;
	connection.connect();
	connection.query(sql, (err, result, field) => {
		res.json(result);
	});
	connection.end();
}); */

router.post('/save', (req, res, next) => {
	const { title, content, isbn, writer, wdate, price } = req.body;
	const sql = `INSERT INTO books SET title=?, content=?, isbn=?, writer=?, wdate=?, price=?`;
	const values = [title, content, isbn, writer, wdate, price];
	connection.connect();
	connection.query(sql, values, (err, result) => {
		if(result.serverStatus === 2) {
			const sql2 = `SELECT * FROM books ORDER BY id DESC`;
			connection.query(sql2, (err, result) => {
				res.json(result);
				connection.end();
			});
		}
		else connection.end();
	});
});

module.exports = router;