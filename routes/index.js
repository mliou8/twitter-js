var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');
var express = require('express');



router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

router.get('/', function (req, res) {
	var tweets = tweetBank.list();
	res.render('index', {title: 'Twitter.js', tweets: tweets, showForm: true});
});

router.get('/users/:name', function(req, res) {
	var name = req.params.name;
	var tweets = tweetBank.find( {name: name} );
	res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets, name: name, showForm: true} );
});


router.get('/users/:name/tweets/:id', function(req, res) {
	var name = req.params.name,
		id = parseInt(req.params.id);
	var tweets = tweetBank.find( {name: name, id: id} );
	res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets} );
});




module.exports = router;
