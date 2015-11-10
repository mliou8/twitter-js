// MODULES
var express = require('express'),
	app = express(),
	chalk = require('chalk'),
	morgan = require('morgan'),
	swig = require('swig'),
	path = require('path');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//Turned off for development purposes
swig.setDefaults({cache: false});


// app.use(morgan('default', {}));
app.use (function (req, res, next) {
	res.statusCode = 418;
	//console.log(chalk.yellow([res.statusCode, req.method, req.path].join(' ')));
	console.log(path.join(req.path));
	next();
});

app.listen(3000, function () {
	console.log(chalk.red("Server listening"));
});

app.get('/', function (req, res) {
	var people = ['Dumbledore', 'Frodo', 'Sam'].map(function(name) {
		return { name: name }
	});
	res.render('index', {title: "An Example", people: people});
});

// app.get('/', function (req, res) {
// 	res.send('<h3> Hello, welcome to the world. </h3>');
// });
