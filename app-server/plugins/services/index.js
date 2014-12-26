
module.exports = function(app) {

    app.services = {
        fitbit: require('./fitbit')(app, app.config.fitbit),
        github: require('./github')(app, app.config.github),
        tumblr: require('./tumblr')(app, app.config.tumblr)
    };
};
