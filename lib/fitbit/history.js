var moment = require('moment'),
	MAX_HISTORY_DAYS = 60;

module.exports = function(app, config) {

	// being kinda lazy and pulling redis client off of cache store :)
	var historyDays = config.fitbit.historyDays,
		redis = app.cache.store.client;

	app.bus.on('fitbit:stats', function(stats) {
		console.log('logging new fitbit history: ', stats.date);

		redis.hset('fitbit:history', stats.date, JSON.stringify(stats), function(err, result) {
			if(err) console.error(err);

			var oldDate = moment(stats.date, 'YYYY-MM-DD')
				.subtract('days', historyDays)
				.format('YYYY-MM-DD');

			redis.hdel('fitbit:history', oldDate, function(err, deleted) {
				if(err) console.error(err);

				if(deleted) console.log('removed old fitbit history: ', oldDate);
			});
		});

	});

};
