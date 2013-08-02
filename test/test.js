var parse = require('../utils/parse.js');
var server = require('./test-server.js');
var test = require('tape');
var request = require('request');
var fs = require('fs');

test('test server works', function(t) {
	t.plan(1);

	// var template_vars = {'html': 'crunk'}

	server.httpServe(
		{'html': 'crunk'},
		httpRequest
	);
	
	function httpRequest () {
		request('http://localhost:7357/', function(error, response, body) {
			// t.notOk(error, "no error");
			t.equal(body, 'crunk', 'correct body');
			server.httpClose();
		});
	}

});



test('finds favicon type 1', function(t) {
	t.plan(1);
	server.httpServe(
		{'html': '<html><head><link rel="icon" href="/favicon.ico" /></head><body></body></html>'},
		parse.pageHarvest('localhost:7357', function(elements) {
			t.equal(elements.favi_url, 'http://localhost:7357/favicon.ico');
			server.httpClose();			
		})
	);
});

test('finds favicon type 2', function(t) {
	t.plan(1);
	server.httpServe(
		{'html': '<html><head><link rel="shortcut icon" href="/favicon.ico" /></head><body></body></html>'},
		parse.pageHarvest('localhost:7357', function(elements) {
			t.equal(elements.favi_url, 'http://localhost:7357/favicon.ico');
			server.httpClose();			
		})
	);
});

test('finds favicon in root', function(t) {
	t.plan(1);
	server.httpServe(
		{'html': '<html><head></head><body></body></html>'},
		parse.pageHarvest('localhost:7357', function(elements) {
			t.equal(elements.favi_url, 'http://localhost:7357/favicon.ico');
			server.httpClose();			
		})
	);
});

test('deals with incorrect favicon link', function(t) {
	t.plan(1);
	server.httpServe(
		{'html': '<html><head><link rel="icon" href="/flavicon.ico" /><link rel="shortcut icon" href="/favicon.ico" /></head><body></body></html>'},
		parse.pageHarvest('localhost:7357', function(elements) {
			t.equal(elements.favi_url, 'http://localhost:7357/favicon.ico');
			server.httpClose();			
		})
	);
});

test('deals with no favicon, plus incorrect link', function(t) {
	t.plan(1);
	server.httpServe(
		{'html': '<html><head><link rel="icon" href="/flavicon.ico" /><link rel="shortcut icon" href="/favicon.ico" /></head><body></body></html>', 'no_favicon': true},
		parse.pageHarvest('localhost:7357', function(elements) {
			t.equal(elements.favi_url, false);
			server.httpClose();			
		})
	);
});
