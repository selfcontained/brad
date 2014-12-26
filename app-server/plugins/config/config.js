module.exports = {

    production: {
        port: process.env.PORT || 8080,
        views: {
            cache: true
        },
        cache: {
            store: 'redis',
            host: process.env.CACHE_REDIS_HOST,
            options: {
                auth_pass: process.env.CACHE_REDIS_PASSWORD
            }
        },
        logging: {
            http: 'dev',
            colorize: true,
            timestamp: true,
            loggers: {
                debug: 'rainbow',
                info: 'green',
                warn: 'yellow',
                error: 'red',
                services: 'cyan'
            },
            enabled: {
                debug: true,
                info: true,
                warn: true,
                error: true,
                services: true
            }
        },
        assets: {
            root: 'http://d3jp09posjitmg.cloudfront.net/',
            dirs: ['public_dist_versioned'],
            maxAge: 31536000000, // one year
            versioned: true,
            debug: false,
            dynamic: false
        },
        fitbit: {
            ttl: '30 minutes',
            historyDays: 60,
            consumerKey: process.env.FITBIT_CONSUMER_KEY,
            consumerSecret: process.env.FITBIT_CONSUMER_SECRET,
            token: {
                oauth_token: process.env.FITBIT_TOKEN,
                oauth_token_secret: process.env.FITBIT_TOKEN_SECRET
            }
        },
        tumblr: {
            ttl: '3 hours',
            key: process.env.TUMBLR_KEY
        },
        github: {
            ttl: '1 day'
        }
    },

    development: {
        views: {
            cache: false
        },
        assets: {
            root: '/',
            dirs: ['public'],
            maxAge: 0,
            versioned: false,
            dynamic: true
        },
        logging: {
            colorize: true
        }
    }
};
