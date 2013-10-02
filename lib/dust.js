var dust = require('dustjs-linkedin'),
	moment = require('moment'),
	extend = require('deap/shallow');

module.exports = function(app, config) {

	dust.makeBase({
		moment: moment
	});

	extend(dust.filters, {
		fromNow: function(v) {
			return moment(v).fromNow();
		},
		lc: function(v) {
			return v.toLowerCase();
		},
		uc: function(v) {
			return v.toUpperCase();
		}
	});
};
