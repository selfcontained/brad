
module.exports = function(app, config) {
	//TODO: expose JSON api in flipflop
	var posts = [
		{
			title: 'flipflop 0.1.0 - configurable urls',
			url: 'http://selfcontained.us/2013/09/14/flipflop-0.1.0-configurable-urls',
			text: "I released a new version of flipflop that has support for configurable urls."
		},
		{
			title: 'using express with broadway',
			url: 'http://selfcontained.us/2012/09/20/using-express-with-broadway/',
			text: "Express is by no doubt an extremely popular http application server/framework for node.js. In this article I'd like to demonstrate how you can take advantage of broadway and express together."
		}
	];

	return function(done) {
		done(null, posts);
	};
};
