var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async'),
	_ = require('lodash'),
	urlLib = require('url');


exports.pageHarvest = function (saniUrl, callback) {
	
	// This controls the process using named functions
	getPage(saniUrl, function(result, urlStr){
		var page = scrapeElements(result); //Extract relevant strings
		// console.log("pageHarvest1", page);
		page.favi_urls = resolveURLs(urlStr, page.favi_urls);
		// console.log("pageHarvest2", page);
		findFavicon(page.favi_urls, urlStr, function(full_favi_url) {
			page.favi_url = full_favi_url;
			delete page.favi_urls;
			// console.log(page);
			callback(page) //CALLBACK

		})
	});
}


function resolveURLs (urlStr, urls) {
	var urls = _.compact(urls);
	// console.log('resolve', urls)
	return _.map(urls, function (url) {
		// console.log("map", url)
		if (typeof url === 'string') {
			return urlLib.resolve(urlStr, url)
		} else {
			return "poop"
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
	var $ = cheerio.load(body),
	page = {
		title: $('title').text()
		, content: $('p').text()
	}

	page.favi_urls = [
		$('link[rel="icon"]').attr('href')
		, $('link[rel="shortcut icon"]').attr('href')
		, '/favicon.ico'
	]

	return page;
}


function findFavicon (favi_urls, urlStr, callback) {
	// console.log("findFavicon", favi_urls)
	async.detect(
		favi_urls,
		function(favi_url, cb) {
			if (favi_url) {
				var full_favi_url = urlLib.resolve(urlStr, favi_url);
				request(full_favi_url, function(error, response) {
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
		    callback(result);
		}
	);
}


