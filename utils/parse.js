var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async'),
	_ = require('lodash'),
	urlLib = require('url');


exports.pageHarvest = function (saniUrl, callback) {
	
	// This controls the process using named functions
	getPage(saniUrl, function(result, urlStr){
		var page = scrapeElements(result); //Extract relevant strings
		page.favi_urls = resolveURLs(urlStr, page.favi_urls);
		findFavicon(page.favi_urls, urlStr, function(full_favi_url) {
			page.favi_url = full_favi_url;
			delete page.favi_urls;
			callback(page) //CALLBACK

		})
	});
}


function resolveURLs (urlStr, urls) {
	var urls = _.compact(urls);
	return _.map(urls, function (url) {
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
	async.detect(
		favi_urls,
		function(favi_url, cb) {
			favi_url = urlLib.resolve(urlStr, favi_url); //Resolve full URL from link

			request(favi_url, function(error, response) {
				if (error || !(response.statusCode === 200)) {
					cb(false);
				} else {
					cb(true);
				}
			});
		},

		function(result){
			if (result) {
			    callback(result);
			} else {
				callback(false)
			}
		}
	);
}


