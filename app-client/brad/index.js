var MainView = require('./views/main/'),
    RepoCollection = require('./models/repository-collection'),
    BlogCollection = require('./models/blog-collection'),
    FitbitStats = require('./models/fitbit-stats');

module.exports = function(config) {
    var app = {
        config: config
    };

    app.view = new MainView({
        el: document.body,
        repos: new RepoCollection(config.repos),
        blogs: new BlogCollection(config.blogs),
        fitbit: new FitbitStats(config.fitbit)
    });

    return app;
};
