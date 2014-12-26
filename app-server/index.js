var EventEmitter = require('events').EventEmitter;

module.exports = function(root) {

    var app = new EventEmitter();

    app.ROOT = root;

    require('./plugins/config/')(app);
    require('./plugins/log/')(app);
    require('./plugins/cache/')(app);
    require('./plugins/services/')(app);
    require('./plugins/http/')(app);

    require('./routes/')(app);

    return app;
};
