var express = require('express');
var app = express();

app.listen(3000, function () {
	console.log("Server listening")
});

app.get('/', function (req, res) {
	res.send('<h3> Hello, welcome to the world. </h3>');
	console.log(req._headers.statusCode);
});