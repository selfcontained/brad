var Github = require('github');

module.exports = function(app, config) {
	var github = new Github({
		version: "3.0.0"
	});

	function getRepos(key, done) {
		console.log('loading gh repos');

		github.repos.getFromUser({ user: 'selfcontained', sort: 'pushed' }, function(err, repos) {
			if(err) return done(err);

			done(null, repos.filter(function(repo) {
				return !repo.fork;
			}));
		});
	}

	return function(done) {
		app.cache.get('repos', getRepos, config.github.ttl, done);
	};
};
