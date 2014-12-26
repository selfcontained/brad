"use strict";

var View = require('ampersand-view'),
    RepositoryView = require('../repository/');

module.exports = View.extend({
    template: require('./repository-collection.jade'),
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, RepositoryView, '.repos-container');

        return this;
    }
});
