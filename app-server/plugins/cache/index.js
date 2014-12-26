var Cashbox = require('cashbox');

module.exports = function(app) {

    app.cache = new Cashbox({ store: 'memory' });
};
