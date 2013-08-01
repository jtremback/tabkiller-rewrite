var parse = require('../utils/parse.js');
var server = require('./test-server.js');
var test = require('tape');
var request = require('request');

test('test server works', function(t) {
	t.plan(2);

	var html = 'crunk'

	server.httpServe(
		html,
		httpRequest
	);
	
	function httpRequest () {
		request('http://localhost:7357/', function(error, response, body) {
			t.notOk(error, "no error");
			t.equal(body, html, 'correct body');
			server.httpClose();
		});
	}

});
