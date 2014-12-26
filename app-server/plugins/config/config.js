module.exports = {

    production: {
        port: process.env.PORT || 8080,
        views: {
            cache: true
        },
        logging: {
            http: 'default',
            colorize: false,
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
            root: 'http://d3lvc3xjxixbeb.cloudfront.net/',
            dirs: ['public_dist_versioned'],
            maxAge: 31536000000, // one year
            versioned: true,
            debug: false,
            dynamic: false
        },
        fitbit: {
            ttl: '30 minutes',
            historyDays: 60
        },
        tumblr: {
            ttl: '3 hours'
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
            http: 'dev',
            colorize: true
        }
    }
};
