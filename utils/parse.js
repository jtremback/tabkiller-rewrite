var urlTools = require('url-tools');

exports.cleanUrl = function (urlStr) {
	return urlTools.normalize(urlStr)
}

