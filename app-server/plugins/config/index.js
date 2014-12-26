var path = require('path'),
    Crampon = require('crampon');

module.exports = function(app) {
    var environment = process.env.NODE_ENV || 'development',
        assetManifest = require('./asset-manifest')(app),
        crampon = new Crampon(['production', 'development'])
            .addFile(path.join(__dirname, './config.js'))
            .addOverride({ assets: { manifest: assetManifest }})
            .addOverride(require(path.join(app.ROOT, 'keys')))
            .addOverrideFile(path.join(app.ROOT, 'settings.js'), true)
            .addOverride({ environment: environment });

    app.config = crampon.getConfig(environment);
};
