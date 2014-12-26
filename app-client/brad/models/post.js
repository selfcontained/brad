var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    props: {
        title: 'string',
        body: 'string',
        date: 'string',
        url: 'string'
    }
});
