var express = require('express'),
	cons = require('consolidate'),
	Cashbox = require('cashbox'),
	deap = require('deap'),
	app = express();

// assign the swig engine to .html files
app.engine('dust', cons.dust);

// set .html as the default extension
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

var config = deap(
	require('./config'),
	require('./keys')
);

app.cache = new Cashbox({ store: 'redis' });

require('./lib/routes')(app, config);
require('./lib/dust')(app, config);

app.listen(3000);
console.log('Express server listening on port 3000');
