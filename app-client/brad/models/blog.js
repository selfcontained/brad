var AmpersandState = require('ampersand-state'),
    PostCollection = require('./post-collection');

module.exports = AmpersandState.extend({
    props: {
        name: 'string',
        url: 'string',
        className: 'string',
        iconClass: 'string',
        image: 'string'
    },
    collections: {
        posts: PostCollection
    }
});
