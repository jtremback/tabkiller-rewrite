// The Url model
 
var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;

var urlSchema = new Schema({
	sani_url: String
	, favi_url: String
	, title: String
	, content: String
});
 
module.exports = mongoose.model('Url', urlSchema);