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



// //Handcrafted
// function getPage(saniUrl, callback) {
// 	console.log('getPage');
// 	var urlStrs = [
// 			'https://qwerfqw' + saniUrl,
// 			'https://wefqwe' + saniUrl,
// 			'https://git' + saniUrl
// 		];

// 	(function get(urlStr) {
// 		if (urlStr) {
// 			request(urlStr, function(error, response, body) {
				
// 				if (!error && response.statusCode == 200) {
// 					console.log('get success: ', urlStr);
// 					callback(null, body, urlStr);
// 				} else {
// 					get(urlStrs.shift());
// 				}
			
// 			});
// 		} else {
// 			callback("no page");
// 		}
// 	})(urlStrs.shift())
// }


// //Pretty janky, this guards the url.resolve against erroring
// function safeResolve(base, link, failure) {
// 	return link ? url.resolve(base, link) : failure;
// }


// function findFavi($, urlStr, callback) {
// 	console.log('findFavi');
// 	var	locations = [
// 			safeResolve(urlStr, $('link[rel="icon"]').attr('href'), 'arse'),
// 			safeResolve(urlStr, $('link[rel="shortcut icon"]').attr('href'), 'arse'),
// 			url.parse(urlStr).host + '/favicon.ico'
// 		];

// 	(function find(location) {
// 		console.log('in find: ', location);
// 		if (location) {
// 			// console.log(location);
// 			request(location, function(error, response) {
// 				console.log('in req: ', location);
			
// 				if (!error && response.statusCode == 200) {
// 					callback(null, location);
// 				} else {
// 					find(locations.shift());
// 				}
			
// 			});
// 		} else {
// 			callback(null, false);
// 		}
// 	})(locations.shift())
// }


// var page_info = {}

// getPage("hub.com/mikeal/request", function(error, body, urlStr) {
// 	if (error) console.log('1: ' + error)
// 	else {
// 		var $ = cheerio.load(body);

// 		findFavi($, urlStr, function(error, location) {
// 			if (error) page_info.favicon = false;
// 			else page_info.favicon = location;
// 		});

// 		page_info.content = $('p').text();
// 		page_info.title = $('title').text();

// 		console.log(page_info)
// 	}
// });



//Using async
function pageHarvest(saniUrl) {
	async.waterfall([

		function(callback) {
			var urlStrs = [
					'https://qwerfqw' + saniUrl,
					'https://wefqwe' + saniUrl,
					'https://ian' + saniUrl
				];

			(function get(urlStr) {
				if (urlStr) {

					request(urlStr, function(error, response, body) {
						if (!error && response.statusCode == 200) {
							callback(null, body, urlStr);
						} else {
							get(urlStrs.shift());
						}
					});

				} else {
					callback("no page");
				}
			})(urlStrs.shift())
		},

		function(body, urlStr, callback) {
			var $ = cheerio.load(body);

			async.parallel({

				favi_location: function(urlStr, callback) {
					
					function safeResolve(base, link, failure) {
						return link ? url.resolve(base, link) : failure;
					}

					var	locations = [
							safeResolve(urlStr, $('link[rel="icon"]').attr('href'), 'arse'),
							safeResolve(urlStr, $('link[rel="shortcut icon"]').attr('href'), 'arse'),
							url.parse(urlStr).host + '/favicon.ico'
						];

					(function find(location) {
						console.log('in find: ', location);
						if (location) {

							request(location, function(error, response) {
								if (!error && response.statusCode == 200) {
									callback(null, location);
								} else {
									find(locations.shift());
								}
							});

						} else {
							callback(null, false);
						}
					})(locations.shift())
				},

				content: function($, callback) {
					callback(null, $('p').text())
				},

				title: function(callback) {
					callback(null, $('title').text())
				}

			},
			//Finish Parallel
			function(error, results) {
				callback(results);
			});
		}
	],
	//Finish Waterfall
	function(error, results) {
		console.log(results)
	});
}



// //harvest elements
// function elementHarvest(html) {
// 	var $ = cheerio.load(html);
// 	async.waterfall([



// 	])
// }


function getPage (saniUrl, callback) {
	var urlStrs = [
		'http://' + saniUrl,
		'https://' + saniUrl
	];

	var result, urlStr;
	async.until(
		function () { return result },
		function (cb) {
			urlStr = urlStrs.shift();
			request(urlStr, function(error, response, body) {
				result = body;
				cb();
			});
		},
		function () { callback(result, urlStr) }
	)
}



function scrapeElements (body) {
	var $ = cheerio.load(body);

	return {
		favi_urls: [
			$('link[rel="icon"]').attr('href')
			, $('link[rel="shortcut icon"]').attr('href')
			, '/favicon.ico'
			],
		title: $('title').text(),
		content: $('p').text()
	}
}



function findFavicon (favi_urls, urlStr, callback) {
	async.each(
		favi_urls, //iterate over

		function(favi_url, cb) {
			if (favi_url) {
				full_favi_url = url.resolve(urlStr, favi_url);
				request(full_favi_url, function(error) {
					if (!error) {
						cb(full_favi_url);
					} else {
						cb(null);
					}
				});
			} else {
				cb(null);
			}
		}, //iterator

		function(success){
			callback(success);
		} //success callback
	)
}


function harvestPage (saniUrl, callback) {
	getPage(saniUrl, function(result, urlStr){
		var elements = scrapeElements(result);

		findFavicon(elements.favi_urls, urlStr, function(full_favi_url) {
			elements.favi_url = full_favi_url;
			delete elements.favi_urls;
			callback(elements)

		})
	});
}

var saniUrl = "en.wikipedia.org/wiki/Switzerland";
harvestPage(saniUrl, function(elements){
	console.log(elements)
});

// for (var i = 12; i <= 0; i++) {
// 	var row;
// 	for (var j = 12; j <= 0; j++) {
// 		row.push(j)
// 	};
// 	console.log(row)
// };


// var htmlizzle = "<div>wark</div>"
// $ = cheerio.load(htmlizzle);

// console.log($('p').text() == false);


