const express = require('express');
const router = express.Router();
const { pool } = require('../modules/mysql-conn');

router.get('/create', (req, res, next) => {
	const pug = {title: "도서등록", scriptFile: ""};
	res.render('./book/create2.pug', pug);
});

router.post('/save', async (req, res, next) => {
	const connect = await pool.getConnection();

	const { title, content, isbn, writer, wdate, price } = req.body;
	const values = [title, content, isbn, writer, wdate, price];
	const sql = `INSERT INTO books SET title=?, content=?, isbn=?, writer=?, wdate=?, price=?`;
	const result = await connect.query(sql, values);
	if(result[0].serverStatus == 2) {
		const sql2 = `SELECT * FROM books ORDER BY id DESC`;
		const result2 = await connect.query(sql2);
		res.json(result2[0]);
	}
	else {
		res.json({err: "데이터 저장에 실패하였습니다."});
	}
	connect.release();
});


router.get('/list', async (req, res, next) => {
	const connect = await pool.getConnection();
	const result = await connect.query('SELECT * FROM books');
	connect.release();
	res.json(result);
});

module.exports = router;