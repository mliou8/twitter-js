var express = require('express');
var app = express();
var chalk = require('chalk');

app.use (function (req, res, next) {
	console.log(chalk.red("This is the middleware"));
	setInterval(function () { next();}, 3000);
});

app.listen(3000, function () {
	console.log(chalk.red("Server listening"));
});

app.get('/', function (req, res) {
	res.send('<h3> Hello, welcome to the world. </h3>');
});



