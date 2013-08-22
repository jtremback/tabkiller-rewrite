/* The API controller
   Exports 3 methods:
   * post - Creates a new thread
   * list - Returns a list of threads
   * show - Displays a thread and its posts
*/
 
 
//var Session = require('../models/thread.js');
var Url = require('../models/url.js');
var parse = require('../utils/parse.js')

//exports.thread = function(req, res) {
//    new Session( {
//		title: req.body.title, 
//		author: req.body.author
//    }).save();
//    
//    res.end("nice")
//}

exports.url = function(req, res) {
	var saniUrl = parse.urlSanitize(req.body.url);
	parse.pageHarvest(saniUrl, function(error, page) {	
		Url.findOne({sani_url: saniUrl}, function(error, url) {
			if (!url) {
				new Url({
					title: page.title
					, content: page.content
					, favi_url: page.favi_url
					, sani_url: saniUrl
				}).save(res.end('url added'));
			} else {
				url = {
					title: page.title
					, content: page.content
					, favi_url: page.favi_url
					, sani_url: saniUrl
				}
				
				url.save(res.end('url updated'))
			}
		})
	});
};

exports.list = function(req, res) {
  Url.find(function(err, urls) {
    res.send(urls);
  });
}
 
//// first locates a thread by title, then locates the replies by thread ID.
//exports.show = (function(req, res) {
//    Session.findOne({title: req.params.title}, function(error, thread) {
//        // notifies user if there is no such thread, returns to avoid crashing
//        if (!thread) {
//          res.send('no such thread');
//          return;
//        }
//        var posts = Post.find({thread: thread._id}, function(error, posts) {
//          res.send([{
//            thread: thread, 
//            posts: posts
//          }]);
//        });
//    })
//});
