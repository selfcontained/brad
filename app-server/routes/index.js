var async = require('async');

module.exports = function(app, config) {
    app.http.get('/', function(req, res, next){

        // res.render('layout');

        async.parallel(
            {
                tumblr: app.services.tumblr.blogs,
                repos: app.services.github.repos,
                fitbit: app.services.fitbit.stats
            },
            function(err, results) {
                if(err) {
                    return next(err);
                }

                res.render('layout', {
                    fitbit: results.fitbit,
                    blogs: results.tumblr,
                    repos : results.repos
                });
            }
        );
    });

};
