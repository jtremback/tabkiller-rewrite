var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async'),
	url = require('url');


exports.harvestPage = function (saniUrl, callback) {
	getPage(saniUrl, function(result, urlStr){
		var elements = scrapeElements(result);

		findFavicon(elements.favi_urls, urlStr, function(full_favi_url) {
			elements.favi_url = full_favi_url;
			delete elements.favi_urls;
			callback(elements)

		})
	});
}



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