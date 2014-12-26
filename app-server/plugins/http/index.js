var path = require('path'),
    http = require('http'),
    express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    cors = require('cors'),
    favicon = require('serve-favicon');

module.exports = function(app) {
    // expose express app
    app.http = express();

    // expose http server
    app._http = http.createServer(app.http);

    // configure express
    app.http.set('env', app.config.environment);
    app.http.disable('x-powered-by');
    app.http.disable('etag');
    app.http.set('view engine', 'jade');
    app.http.set('view cache', app.config.views.cache);
    app.http.set('views', path.join(app.ROOT, 'app-server', 'views'));
    app.http.locals.basedir = path.join(app.ROOT, 'app-server', 'views');

    app.http.engine('jade', require('jade').__express);

    // asset url helper
    app.http.locals.url = require('./url')(app);

    app.http.use(compression());
    app.http.use(cors());

    if (app.config.assets.dynamic) {
        require('./assets')(app);
    }

    // static middleware - can be multiple dirs
    app.config.assets.dirs.forEach(function(dir) {
        app.http.use(express.static(path.join(app.ROOT, dir), {
            maxAge: app.config.assets.maxAge
        }));
    });


    if (app.config.logging.http) {
        app.http.use(morgan(app.config.logging.http));
    }

    // add common middleware
    // app.http.use(favicon(path.join(app.ROOT, 'public', 'favicon.ico')));

};
