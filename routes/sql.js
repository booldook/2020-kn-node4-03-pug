const express = require('express');
const router = express.Router();

/** mysql *************************/
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: '',
	port: ,
	password: '',
	database: ''
});

router.get('/create', (req, res, next) => {
	const pug = {title: "도서등록", scriptFile: ""};
	res.render('./book/create.pug', pug);
});

router.post('/save', (req, res, next) => {
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
});

module.exports = router;