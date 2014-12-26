var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    props: {
        date: 'string',
        steps: {
            current: 'number',
            goal: 'number',
            progress: 'number'
        },
        floors: {
            current: 'number',
            goal: 'number',
            progress: 'number'
        }
    }
});
