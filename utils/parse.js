var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async'),
	_ = require('lodash'),
	urlLib = require('url'),
	urlTools = require('url-tools');

/**
 * Sanitize raw url for our system.
 *
 * Examples:
 *
 *     	parse.urlSanitize("https://www.website.com#canoe") // saniUrl = "website.com
 *
 * @param {String} saniUrl
 * @param {Function} done
 * @api public
 */

// TODO: Write tests for parse.urlSanitize
exports.urlSanitize = function (urlStr) {
	var options = {
			lowercase: true,
			removeWWW: true,
			removeTrailingSlash: true,
			forceTrailingSlash: false,
			removeSearch: false,
			removeHash: true,
			removeHashbang: true,
			removeProtocol: true
		};
	
	return urlTools.normalize(urlStr, options);
}


/**
 * Scrape all neccesary information from a page. Takes a sanitized url
 * (hostname + pathname) and returns a page object containing the information. 
 *
 * Examples:
 *
 *     	parse.pageHarvest("website.com", function(page) {
 *			doSomething(page);
 *		});
 *
 * @param {String} saniUrl
 * @param {Function} done
 * @api public
 */

exports.pageHarvest = function (saniUrl, callback) {	
	// This controls the process using named functions
	getPage(saniUrl, function(error, result, urlStr){
		if (error) {
			callback(error)
		} else {
			var page = scrapeElements(result); //Extract relevant strings
			page.favi_urls = resolveURLs(urlStr, page.favi_urls);
			findFavicon(page.favi_urls, urlStr, function(full_favi_url) {
				page.favi_url = full_favi_url;
				delete page.favi_urls;
				callback(null, page) //CALLBACK
			})
		}
	});
}


function resolveURLs (base, links) {
	var links = _.compact(links);
	return _.map(links, function (link) {
		if (typeof link === 'string') {
			return urlLib.resolve(base, link)
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
		function () { return result }
		, function (cb) {
			console.log(urlStrs.length);
			urlStr = urlStrs.shift();
			if (urlStr) {
				console.log(urlStr);
				request(urlStr, function(error, response, body) {
					result = body;
					cb();
				});
			} else {
				callback(new Error('No site found'))
			}
		}
		, function () { callback(null, result, urlStr) }
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


