var app = require('./app-server/')(__dirname);

var server = app.http.listen(app.config.port, function(err) {
    if(err) return console.error('Error starting server: ', err.toString());

    var address = server.address();

    app.log.info('Server started: http://%s:%s', address.address, address.port);
});
