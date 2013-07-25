var url = require('url');

var cleanUrl = function (urlStr) {
	var urlObj = url.parse(urlStr);
	return urlObj.hostname + urlObj.pathname;
}

var printUrl = function (urlStr) {
	var urlObj = url.parse(urlStr);
	console.log(urlObj);
}

var cases = [
	"http://www.tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy#stoops",
	"http://docs.mongodb.org/manual/reference/operator/in/",
	"http://www.example.com/thing?=query"

]

for (var i = cases.length - 1; i >= 0; i--) {
	console.log(printUrl(cases[i]))
};