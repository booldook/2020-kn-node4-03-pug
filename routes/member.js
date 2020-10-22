const express = require('express');
const router = express.Router();	// new Router();

router.get('/login', (req, res, next) => {
	const pug = {
		title: "로그인페이지",
		scriptFile: '../js/f-member.js'
	}
	res.render('./member/login.pug', pug);
});

router.get('/join', (req, res, next) => {
	const pug = {
		title: "회원가입페이지",
		scriptFile: '../js/f-join.js'
	}
	res.render('./member/join.pug', pug);
});




module.exports = router;