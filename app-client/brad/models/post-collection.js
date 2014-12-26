var Collection = require('ampersand-collection'),
    Post = require('./post');

module.exports = Collection.extend({
    model: Post
});
