"use strict";

var View = require('ampersand-view'),
    FitbitView = require('./fitbit/');

module.exports = View.extend({
    template: require('./jumbotron.jade'),
    initialize: function(options) {
        this.fitbit = options.fitbit;
    },
    subviews: {
        fitbit: {
            container: '.fitbit-container',
            prepareView: function(el) {
                console.log('jumbotron: ', this.fitbit);
                return new FitbitView({
                    el: el,
                    model: this.fitbit
                });
            }
        }
    }
});
