var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'cb'
        },
        port: process.env.PORT || 3000,
    },

    test: {
        root: rootPath,
        app: {
            name: 'cb'
        },
        port: process.env.PORT || 3000,
    },

    production: {
        root: rootPath,
        app: {
            name: 'cb-aw1'
        },
        port: process.env.PORT,
    }
};

module.exports = config[env];
