var Hoek = require('hoek');
var path = require('path');
// TODO: config or buildDir should be accessible through options or server...confirm and/or fix3
var Config = require('../config.js').Config;

exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: path.resolve(Config.get('/buildDir')),
                listing: true
            }
            
        },
        config: {
            cors: true
        }
    });


    next();
};


exports.register.attributes = {
    name: 'build'
};
