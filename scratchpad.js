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
	cheerio = require('cheerio'),
	async = require('async'),
	url = require('url');

// //UTILS
// function requestTest(location, cb) {
// 	request(location, function(error) {
// 		if (error) {
// 			return false;
// 		} else {
// 			return true;
// 		}
// 	})
// }


// //MAIN FUNCTION
// function harvestPage1(saniUrl, cb) {
// 	var urlStrs = [
// 		'http://' + saniUrl,
// 		'https://' + saniUrl
// 	];

// 	function get(urlStr) {
// 		if (urlStr) {

// 			request(urlStr, function(error, response, body) {
// 				if (!error && response.statusCode == 200) {
// 					// Success
// 					return getElements(body, urlStr);
// 				} else {
// 					// Try again
// 					return get(urlStrs.shift());
// 				}
// 			})

// 		} else {
// 			// All steps fail
// 			return false;
// 		}
// 	}

// 	function getElements(body, urlStr, cb) {
// 		var $ = cheerio.load(body)

// 		function findFavi() {
// 			//This is an array of places where the favicon file might be
			// var locations = [
			// 	$('link[rel="icon"]').attr('href'),
			// 	$('link[rel="shortcut icon"]').attr('href'),
			// 	url.parse(urlStr).host + 'favicon.ico'
			// ];

// 			(function find(location) {
// 				console.log('find');
// 				if (location) {

// 					request(location, function(error) {
// 						if (!error) {
// 							// Success
// 							cb( page_info =  {
// 								favi_location: findFavi(),
// 								text: $('p').text(),
// 								title: $('title').text()
// 							})

// 						} else {
// 							// Try again
// 							return find(locations.shift());
// 						}

// 				} else {
// 					// All steps fail
// 					return false;
// 				}
// 			})(locations.shift());
// 		}
// 	}
// }

// harvestPage('github.com/mikeal/request/blob/master/README.md', console.log)



// // function harvestPage(saniUrl, cb) {
// // 	async.waterfall([
// // 		function(cb) {

// // 		},

// // 	])
// // }

// function getPage(saniUrl, callback) {
// 	var urlStrs = [
// 		'http://' + saniUrl,
// 		'https://' + saniUrl
// 	];
// 	async.until(
// 		function () { return urlStrs === 0 },
// 		function (callback) {
// 			request( urlStrs.shift(), function(error, response, body) {
// 				if (!error && response.statusCode == 200) {
// 					// Success
// 					callback(body, urlStr);
// 				} else {
// 					// Try again
// 					getPage(urlStrs.shift());
// 				}
// 			})
// 		},
// 		function (err) {

// 		}
// 	)
// }


function getPage(saniUrl, callback) {
	console.log('getPage');
	var urlStrs = [
			'https://qwerfqw' + saniUrl,
			'https://wefqwe' + saniUrl,
			'https://git' + saniUrl
		];

	(function get(urlStr) {
		if (urlStr) {
			request(urlStr, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log(urlStr);
					callback(null, body, urlStr);
				} else {
					get(urlStrs.shift());
				}
			});
		} else {
			callback("no page");
		}
	})(urlStrs.shift())
}



function findFavi(body, urlStr, callback) {
	console.log('findFavi');
	var $ = cheerio.load(body),
		locations = [
			urlStr ? false : url.resolve(urlStr, $('link[rel="icon"]').attr('href')),
			urlStr ? false : url.resolve(urlStr, $('link[rel="shortcut icon"]').attr('href')),
			// url.parse(urlStr).host + $('link[rel="icon"]').attr('href'),
			// url.parse(urlStr).host + $('link[rel="shortcut icon"]').attr('href'),
			url.parse(urlStr).host + '/favicon.ico'
		];

	(function find(location) {
		console.log('in find: ', location);
		if (location) {
			// console.log(location);
			request(location, function(error) {
				console.log('in req: ', location);
				if (!error && response.statusCode == 200) {
					callback(null, location);
				} else {
					find(locations.shift());
				}
			});
		} else {
			callback("no favicon");
		}
	})(locations.shift())
}

// console.log('parse-test: ', url.parse('https://github.com').host);

var page_info = {}

getPage("hub.com/mikeal/request", function(error, body, urlStr) {
	if (error) console.log('1: ' + error)
	else findFavi(body, urlStr, function(error, location) {
		if (error) console.log('2: ' + error);
		else console.log('success', location);
	});
});

// console.log(url.resolve('http://example.com/one/aes/whittlebaggins', 'http://bow.crackins/two'));
// function asyncFake(data, callback) {        
//     process.nextTick(function() {
//     	callback(data === 'foo');
//     });
    
// }

// asyncFake('bar', function(result) {
//     if (result) {
//     	console.log(true);
//     } else {
//     	console.log(false);
//     }
// });