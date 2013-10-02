var extend = require('deap/shallow'),
	async = require('async');

module.exports = function(app, config) {
	var tumblr = require('./tumblr')(app, config),
		fitbit = require('./fitbit')(app, config),
		github = require('./github')(app, config),
		selfcontained = require('./selfcontained')(app, config),
		contributor = config.github.contributor;

	app.get('/', function(req, res, next){

		async.parallel(
			{
				selfcontained: selfcontained,
				tumblr: tumblr,
				repos: github,
				fitbit: fitbit
			},
			function(err, results) {
				if(err) return next(err);

				res.render('index', {
					fitbit: results.fitbit,
					posts: extend(results.tumblr, { selfcontained: results.selfcontained }),
					repos : results.repos,
					contributor: contributor
				});
			}
		);
	});
};
