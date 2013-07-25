var test = require('tape');
var parse = require('./utils/parse.js');

test('clean urls correctly', function(t) {
	t.plan(4);
	var cases = [
		"http://www.example.com/thing?=query",
		"http://www.example.com/thing#hash",
		"www.example.com/thing",
		"example.com/thing"
	],
	target = "example.com/thing"

	for (var i = cases.length - 1; i >= 0; i--) {
		t.equal(parse.cleanUrl(cases[i]), target)
	};
});