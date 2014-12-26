"use strict";

var View = require('ampersand-view'),
    BlogView = require('../blog/');

module.exports = View.extend({
    template: require('./blog-collection.jade'),
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, BlogView, '.blog-collection-container');

        return this;
    }
});
