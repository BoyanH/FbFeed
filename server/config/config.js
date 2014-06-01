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
        db: 'mongodb://admin:fdhsoolvdhabfsadkfds@ds033469.mongolab.com:33469/beautifulfeed',
        port: process.env.PORT || 1234
    }
}