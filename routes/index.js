var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
	var tweets = tweetBank.list();
	res.render('index', {title: 'Twitter.js', tweets: tweets});
});

router.get('/users/:name', function(req, res) {
	var name = req.params.name;
	var tweets = tweetBank.find( {name: name} );
	res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets} );
});


router.get('/users/:name/tweets/:id', function(req, res) {
	var name = req.params.name,
		id = parseInt(req.params.id);
	var tweets = tweetBank.find( {name: name, id: id} );
	res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets} );
});

module.exports = router;
