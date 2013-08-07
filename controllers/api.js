/* The API controller
   Exports 3 methods:
   * post - Creates a new thread
   * list - Returns a list of threads
   * show - Displays a thread and its posts
*/
 
 
//var Session = require('../models/thread.js');
var Url = require('../models/url.js');

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
	
	parse.pageHarvest(saniUrl, function(page) {
		new Url({
			title: page.title
			, content: page.content
			, favi_url: page.favi_url
		}).save();
		
		res.end('you have succeeded');
	});
};

//exports.list = function(req, res) {
//  Session.find(function(err, threads) {
//    res.send(threads);
//  });
//}
 
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