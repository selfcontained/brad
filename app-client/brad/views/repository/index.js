"use strict";

var View = require('ampersand-view');

module.exports = View.extend({
    autoRender: true,
    template: require('./repository.jade')
});
