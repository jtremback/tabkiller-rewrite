// The main application script, ties everything together.
 
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var http = require('http');
 
// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost/norum');
 
// all environments
app.set('port', process.env.PORT || 3000);

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});
 
// set up the RESTful API, handler methods are defined in api.js
var api = require('./controllers/api.js');
app.post('/', api.url);
app.get('/', api.list);
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});