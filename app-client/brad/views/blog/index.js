"use strict";

var View = require('ampersand-view'),
    PostView = require('../post/');

module.exports = View.extend({
    template: require('./blog.jade'),
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.model.posts, PostView, '.posts-container');

        return this;
    }
});
