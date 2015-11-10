// MODULES
var express = require('express'),
	app = express(),
	chalk = require('chalk'),
	morgan = require('morgan');

// app.use(morgan('default', {}));
app.use (function (req, res, next) {
	res.statusCode = 418;
	console.log(chalk.yellow([res.statusCode, req.method, req.path].join(' ')));
	next();
});

app.listen(3000, function () {
	console.log(chalk.red("Server listening"));
});

app.get('/', function (req, res) {
	res.send('<h3> Hello, welcome to the world. </h3>');
});
