var Collection = require('ampersand-collection'),
    Repository = require('./repository');

module.exports = Collection.extend({
    model: Repository
});
