var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    props: {
        name: 'string',
        description: 'string',
        language: 'string',
        url: 'string',
        latestPush: 'string'
    }
});
