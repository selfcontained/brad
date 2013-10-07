var fitbit = require('fitbit-js'),
	deap = require('deap'),
	moment = require('moment');

module.exports = function(app, config) {
	var client = fitbit(config.fitbit.consumerKey, config.fitbit.consumerSecret);

	function getStats(key, done) {
		var date = moment().format('YYYY-MM-DD'),
			path = '/user/-/activities/date/'+date+'.json',
			params = deap.clone({
				token: config.fitbit.token
			});

		console.log('loading fitbit stats');
		client.apiCall('GET', path, params, function(err, resp, body) {
			if(err) return done(err);

			var stats = deap({ goals: { steps: 10000, floors: 10 } }, body);
console.log('stats: ', stats);
			done(err, {
				steps: {
					current: stats.summary.steps,
					goal: stats.goals.steps,
					progress: Math.floor(stats.summary.steps / stats.goals.steps * 100)
				},
				floors: {
					current: stats.summary.floors,
					goal: stats.goals.floors,
					progress: Math.floor(stats.summary.floors / stats.goals.floors * 100)
				}
			});
		});
	}

	return function(cb) {
		app.cache.get('fitbit', getStats, config.fitbit.ttl, cb);
	};

};
