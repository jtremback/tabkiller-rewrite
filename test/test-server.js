var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


var opts = {};


app.get('/', function(req, res) { 
	res.render('index', opts);
	res.end(); //close the response
	req.connection.end(); //close the socket
	req.connection.destroy; //close it really
});



exports.httpServe = function (head, body, callback) {
	opts.head = head;
	opts.body = body;
	httpServer.listen('7357', callback);
}

exports.httpClose = function () {
	httpServer.close(function () {
		console.log('http server closed')
	});
}


// // Disabling https testing for now
// var httpsServer = require('https').createServer(app);
// exports.httpsServe = function (callback) {
// 	httpsServer.listen('7357');
// }

// exports.httpsClose = function () {
// 	httpsServer.close(function () {
// 		console.log('https server closed')
// 	});
// }
