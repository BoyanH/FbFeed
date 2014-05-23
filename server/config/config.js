var path = require('path');
var rootPath = path.normalize(__dirname + '/../..')

module.exports = {
    development:{
        rootPath: rootPath,
        db: 'mongodb://localhost/fbfeed',
        port: process.env.PORT || 1234
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:fvbdusfbkncdalivfds@ds027688.mongolab.com:27688/listentomusic',
        port: process.env.PORT || 1234
    }
}