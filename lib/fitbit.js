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


			done(err, {
				steps: {
					current: body.summary.steps,
					goal: (body.goals && body.goals.steps) || 10000,
					progress: Math.floor(body.summary.steps / body.goals.steps * 100)
				},
				floors: {
					current: body.summary.floors,
					goal: (body.goals && body.goals.floors) || 10,
					progress: Math.floor(body.summary.floors / body.goals.floors * 100)
				}
			});
		});
	}

	return function(cb) {
		app.cache.get('fitbit', getStats, config.fitbit.ttl, cb);
	};

};
