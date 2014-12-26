var Github = require('github'),
    moment = require('moment-timezone');

module.exports = function(app, config) {
    var github = new Github({
        version: "3.0.0"
    });

    function getRepos(key, done) {
        github.repos.getFromUser({ user: 'selfcontained', sort: 'pushed' }, function(err, repos) {
            if(err) {
                return done(err);
            }

            repos = repos
                .filter(function(repo) {
                    return !repo.fork;
                })
                .map(function(repo) {
                    return {
                        name: repo.name,
                        description: repo.description,
                        url: repo.html_url,
                        language: (repo.language||'').toLowerCase(),
                        latestPush: moment(repo.pushed_at).fromNow()
                    };
                });
            done(null, repos);
        });
    }

    return {
        repos: function(done) {
            app.cache.get('github:repos', getRepos, config.ttl, done);
        }
    };
};
