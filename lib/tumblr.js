var Tumblr = require('tumblr.js'),
	Cashbox = require('cashbox'),
	async = require('async');

module.exports = function(app, config) {
	var tumblr = Tumblr.createClient({
		consumer_key: config.tumblr.key
	});

	function loadBlogs(key, done) {
		console.log('loading tumblr blogs');

		async.parallel(
			{
				lolharriskids: function(cb) {
					tumblr.posts('lolharriskids', { limit: 2 }, function(err, response) {
						cb(err, response.posts||[]);
					});
				},
				drizztquotes: function(cb) {
					tumblr.posts('drizztquotes', { limit: 2 }, function(err, response) {
						cb(err, response.posts||[]);
					});
				}
			},
			done
		);
	}
	return function(done) {
		app.cache.get('tumblr', loadBlogs, config.tumblr.ttl, done);
	};
};
