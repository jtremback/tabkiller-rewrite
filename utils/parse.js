var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async'),
	_ = require('lodash')
	url = require('url');


exports.pageHarvest = function (saniUrl, callback) {
	
	// This controls the process using named functions
	getPage(saniUrl, function(result, urlStr){
		var page = scrapeElements(result);

		findFavicon(page.favi_urls, urlStr, function(full_favi_url) {
			page.favi_url = full_favi_url;
			delete page.favi_urls;
			
			callback(page) //CALLBACK

		})
	});

	function resolveURLs (urls) {
		_.map(urls, function (url) {
			if (typeof url === 'string') {
				
			} else {
				return false
			}
		});
	}
 
	function getPage (saniUrl, callback) {
		var urlStrs = [
			'http://' + saniUrl
			, 'https://' + saniUrl
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
		async.detect(
			favi_urls,

			function(favi_url, cb) {
				if (favi_url) {
					var	full_favi_url = url.resolve(urlStr, favi_url);
					request(full_favi_url, function(error, response) {
						// console.log(response.statusCode);
						if (error || !(response.statusCode === 200)) {
							cb(false);
						} else {
							cb(true);
						}
					});
				} else {
					cb(false);
				}
			},

			function(result){
				// console.log(result)
			    callback(result);
			}
		);
	}
}


