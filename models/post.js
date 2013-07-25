// The Post model
 
var mongoose = require('mongoose')
   , Schema = mongoose.Schema
   , ObjectId = Schema.ObjectId;
 
var postSchema = new Schema({
    session: ObjectId,
    author: {type: String, default: 'Anon'},
    url: String
});
 
module.exports = mongoose.model('Post', postSchema);