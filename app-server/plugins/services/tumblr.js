var Tumblr = require('tumblr.js'),
    moment = require('moment'),
    async = require('async');

module.exports = function(app, config) {
    var POST_LIMIT = 3,
        tumblr = Tumblr.createClient({
            consumer_key: config.key
        });

    function loadBlogs(key, done) {
        async.parallel(
            [
                function(cb) {
                    tumblr.posts('lolharriskids', { limit: POST_LIMIT }, function(err, response) {
                        cb(err, {
                            name: 'lolharriskids.tumblr.com',
                            url: 'http://lolharriskids.tumblr.com',
                            className: 'lolharriskids',
                            iconClass: 'icon-smile',
                            image: 'http://25.media.tumblr.com/avatar_69a22e7c2275_48.png',
                            posts: (response.posts||[]).map(mapData)
                        });
                    });
                },
                function(cb) {
                    tumblr.posts('drizztquotes', { limit: POST_LIMIT }, function(err, response) {
                        cb(err, {
                            name: 'drizztquotes.tumblr.com',
                            url: 'http://drizztquotes.tumblr.com',
                            className: 'drizztquotes',
                            iconClass: 'icon-quote-right',
                            image: 'http://25.media.tumblr.com/avatar_e8aa0e4e0425_48.png',
                            posts: (response.posts||[]).map(mapData)
                        });
                    });
                }
            ],
            done
        );
    }

    return {
        blogs: function(done) {
            app.cache.get('tumblr:blogs', loadBlogs, config.ttl, done);
        }
    };
};

function mapData(data) {
    return {
        title: data.title,
        body: data.body||data.text,
        date: moment(data.date).fromNow(),
        url: data.short_url
    };
}
