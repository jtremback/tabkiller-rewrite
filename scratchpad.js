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

var request = require('request');


var harvestPage = function (saniUrl) {
	var prefixes = [
		'https://sdfg',
		'https://w4rt',
		'https://sdfg',
		'https://git'
	]

	function get(prefix) {
		if (prefix) {
			request(prefix + saniUrl, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log(response);
				} else {
					return get(prefixes.shift())
				}
			})
		} else {
			console.log("Ur shit is fucked.");
		}
	}

	get(prefixes.shift());


	
}



harvestPage('hub.com/mikeal/request/blob/master/README.md')



