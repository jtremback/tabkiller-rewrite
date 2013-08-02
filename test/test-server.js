var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(app.router);
app.use(express.static(__dirname + '/public'));


//opts variable lives outside of exports and server code to allow the two to communicate
var opts = {};

exports.httpServe = function (callback) {
	// opts = options; //set external opts var to passed in option from test script
	httpServer.listen('7357', callback);
};

exports.setOptions = function (options, callback) {
	opts = options;
	return callback;
};

app.get('/', function(req, res) { 
	res.render('index', opts); //use external opts var to populate template
	// res.end(); //close the response
	// req.connection.end(); //close the socket
	// req.connection.destroy(); //close it really
	// opts = {}; //reset opts variable
});


app.get('/favicon.ico', function(req, res){
	if (opts.no_favicon) {
		res.send(404); //deny favicon if neccesary
		// opts.no_favicon = false; //reset favicon state (doesn't work right now)
	} else {
		res.sendfile('./public/favicon.ico');
	}
});

exports.httpClose = function () {
	httpServer.close(function () {
		console.log('http server closed');
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
