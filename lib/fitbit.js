var fitbit = require('fitbit-js'),
	deap = require('deap'),
	moment = require('moment');

module.exports = function(app, config) {
	var client = fitbit(config.fitbit.consumerKey, config.fitbit.consumerSecret);

	function getStats(date, done) {
		var path = '/user/-/activities/date/'+date+'.json',
			params = deap.clone({
				token: config.fitbit.token
			});

		console.log('loading fitbit stats');
		client.apiCall('GET', path, params, function(err, resp, body) {
			if(err) return done(err);

			body = deap({ goals: { steps: 10000, floors: 10 } }, body);

			var stats = {
				date: date,
				steps: {
					current: body.summary.steps,
					goal: body.goals.steps,
					progress: Math.floor(body.summary.steps / body.goals.steps * 100)
				},
				floors: {
					current: body.summary.floors,
					goal: body.goals.floors,
					progress: Math.floor(body.summary.floors / body.goals.floors * 100)
				}
			};

			app.bus.emit('fitbit:stats', stats);
			done(err, stats);
		});
	}

	return function(cb) {
		var date = moment().format('YYYY-MM-DD'),
			getIt = function(key, done) {
				getStats(date, done);
			};

		app.cache.get('fitbit:day:'+date, getIt, config.fitbit.ttl, cb);
	};

};
