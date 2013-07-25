// The Session model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var sessionSchema = new Schema({
    createdate: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'}
});
 
module.exports = mongoose.model('Session', sessionSchema);