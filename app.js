// MODULES
var express = require('express'),
	app = express(),
	chalk = require('chalk'),
	morgan = require('morgan'),
	swig = require('swig'),
	path = require('path'),
	routes = require('./routes/'),
	mime = require('mime'),
	fs = require('fs'),
	bodyParser = require('body-parser');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Turned off for development purposes
swig.setDefaults({cache: false});


app.use(function(req, res, next) {
  console.log(req.path)
  var mimeType = mime.lookup(req.path)
  fs.readFile('./public/' + req.path, function(err, fileBuffer) {
    if(err) return next()
    res.header('Content-Type', mimeType)
    res.send(fileBuffer)
  })
})

app.use('/', routes);



var port = 3000;
app.listen(3000, function () {
	console.log(chalk.green("Server listening at " + port));
});

app.get('/', function (req, res) {
	var people = ['Dumbledore', 'Frodo', 'Sam'].map(function(name) {
		return { name: name }
	});
	res.render('index', {title: "An Example", people: people});
});
