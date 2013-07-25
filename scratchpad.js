// var url = require('url');

// var cleanUrl = function (urlStr) {
// 	var urlObj = url.parse(urlStr);
// 	return urlObj.hostname + urlObj.pathname;
// }

// var printUrl = function (urlStr) {
// 	var urlObj = url.parse(urlStr);
// 	console.log(urlObj);
// }

// var cases = [
// 	"http://www.tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy#stoops",
// 	"http://docs.mongodb.org/manual/reference/operator/in/",
// 	"http://www.example.com/thing?=query"

// ]

// for (var i = cases.length - 1; i >= 0; i--) {
// 	console.log(printUrl(cases[i]))
// };

var request = require('request'),
	cheerio = require('cheerio');


var harvestPage = function (saniUrl) {
	var prefixes = [
		'http://'
		, 'https://'
		]
		, body;

	// cycles through prefixes, assigning the body to body if it is successful, calling itself with new prefix if not
	function get(prefix) {
		if (prefix) {
			request(prefix + saniUrl, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					body = body;
				} else {
					return get(prefixes.shift());
				}
			})
		} else {
			console.log("Ur shit is fucked.");
		}
	}

	get(prefixes.shift());

	var locations = [
		'link[rel="icon"]'
		, 'link[rel="shortcut icon"]'
	]
	, $ = cheerio.load(body);

	function findFavi(location) {
		if (location) {
			//# this is where cheerio tries the various spots
		} else {
			//# this is where the root level option is executed
			return findFavi(locations.shift());
		}
	}

}



harvestPage('github.com/mikeal/request/blob/master/README.md')



