/** 전역변수 *************************/
const express = require('express');
const app = express();
const path = require('path');

/** 전역변수 *************************/
const memberRouter = require('./routes/member');
const sqlRouter = require('./routes/sql');

/** mysql *************************/
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: '',
	port: ,
	password: '',
	database: ''
});

connection.connect();

connection.query('SELECT * FROM books', (err, result, field) => {
	console.log(result[0].id);
	console.log(result[0].title);
	console.log(result[0].isbn);
	console.log(result[0].content);
	console.log(result[0].writer);
	console.log(result[0].wdate);
	console.log(result[0].price);
	console.log(result[0].amount);
});

connection.end();


/** 서버구동 *************************/
app.listen(3000, () => { console.log('http://127.0.0.1:3000') });


/** PUG 등록 *************************/
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;


/** Router *************************/
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', express.static(path.join(__dirname, './public')));
app.use('/storage', express.static(path.join(__dirname, './uploads')));
app.use('/member', memberRouter);
app.use('/sql', sqlRouter);
