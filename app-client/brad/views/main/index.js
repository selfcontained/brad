"use strict";

var View = require('ampersand-view'),
    NavbarView = require('../navbar/'),
    JumbotronView = require('../jumbotron/'),
    RepoCollectionView = require('../repository-collection/'),
    BlogCollectionView = require('../blog-collection/');

module.exports = View.extend({
    autoRender: true,
    template: require('./main.jade'),
    initialize: function(options){
        this.repos = options.repos;
        this.blogs = options.blogs;
        this.fitbit = options.fitbit;

        return this;
    },
    subviews: {
        navbar: {
            container: 'div.navbar-container',
            constructor: NavbarView
        },
        jumbotron: {
            container: 'div.jumbotron-container',
            prepareView: function(el) {
                return new JumbotronView({
                    el: el,
                    fitbit: this.fitbit
                });
            }
        },
        github: {
            container: 'div.github-container',
            prepareView: function(el) {
                return new RepoCollectionView({
                    el: el,
                    collection: this.repos
                });
            }
        },
        blogs: {
            container: 'div.blogs-container',
            prepareView: function(el) {
                return new BlogCollectionView({
                    el: el,
                    collection: this.blogs
                });
            }
        }
    }
});
