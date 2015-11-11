// MODULES
// This is so ugly. Some way to improve it?
var express = require('express'),
	bodyParser = require('body-parser');
	chalk = require('chalk'),
	fs = require('fs'),
	mime = require('mime'),
	morgan = require('morgan'),
	path = require('path'),
	routes = require('./routes/'),
	socketio = require('socket.io'),
	swig = require('swig');

var app = express();

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

var port = 3000;
var server = app.listen(3000, function () {
	console.log(chalk.green("Server listening at " + port));
});
var io = socketio.listen(server);

app.use('/', routes(io));

app.get('/', function (req, res) {
	var people = ['Dumbledore', 'Frodo', 'Sam'].map(function(name) {
		return { name: name }
	});
	res.render('index', {title: "An Example", people: people});
});
