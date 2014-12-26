var Collection = require('ampersand-collection'),
    Blog = require('./blog');

module.exports = Collection.extend({
    model: Blog
});
