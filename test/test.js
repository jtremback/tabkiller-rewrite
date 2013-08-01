var test = require('tape');
var parse = require('../utils/parse.js');
var server = require('./test-server.js');
var test = require('tape');
var request = require('request');




server.httpServe(
	'crunk', //head
	'dingwhistle', //body
	httpRequest
);


setTimeout( server.httpClose, 10000 )


function httpRequest () {
	request('http://localhost:7357/', function(error, response, body) {
		console.log(error, body);
	});
}
