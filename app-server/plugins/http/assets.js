var path = require('path'),
    DevBundler = require('browserify-dev-bundler');

module.exports = function(app) {

    var bundler = DevBundler({
        root: path.join(app.ROOT, 'app-client'),
        debug: app.config.assets.debug,
        transforms: ['jadeify'],
        addFile: function(bundle, module, modulePath) {
            bundle.require(modulePath, { expose: module });
        }
    });

    app.http.use('/js', bundler.middleware(/^\/(.+)\.js$/));

    bundler.on('bundle-error', function(err) {
        app.log.error('JS Bundle Error: %s', err.message);
    });

    bundler.on('new-source', function(module) {
        app.log.info('bundle updated', module);
    });
};
