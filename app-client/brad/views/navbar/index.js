"use strict";

var View = require('ampersand-view'),
    elementClass = require('element-class');

module.exports = View.extend({
    autoRender: true,
    template: require('./navbar.jade'),
    events: {
        'click button.navbar-toggle': 'toggleNavbar'
    },

    toggleNavbar: function() {
        var el = elementClass(this.el.querySelector('div.navbar-collapse'));

        if(el.has('collapse')) {
            el.remove('collapse');
        }else{
            el.add('collapse');
        }
    }
});
