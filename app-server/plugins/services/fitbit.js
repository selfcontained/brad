var fitbit = require('fitbit-js'),
    deap = require('deap'),
    moment = require('moment-timezone');

module.exports = function(app, config) {
    var MY_TIMEZONE = 'America/Denver',
        client = fitbit(config.consumerKey, config.consumerSecret);

    function getStats(date, done) {
        var path = '/user/-/activities/date/'+date+'.json',
            params = deap.clone({
                token: config.token
            });

        client.apiCall('GET', path, params, function(err, resp, body) {
            if(err) {
                console.log('fitbit err: ', err);
                return done(err.toString());
            }

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

            done(err, stats);
        });
    }

    return {
        stats: function(cb) {
            var date = moment().tz(MY_TIMEZONE).format('YYYY-MM-DD'),
                getIt = function(key, done) {
                    getStats(date, done);
                };

            app.cache.get('fitbit:day:'+date, getIt, config.ttl, cb);
        }
    };
};
