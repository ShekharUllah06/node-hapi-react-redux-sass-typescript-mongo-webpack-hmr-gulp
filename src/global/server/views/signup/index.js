/*
exports.register = function (plugin, options, next) {

    plugin.route({
        method: 'GET',
        path: '/signup',
        handler: function (request, reply) {

            reply.view('signup/index');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/signup'
};
*/

var Hoek = require('hoek');
var path = require('path');
var pkg = require('../../../../../package.json');
var util = require('util');


exports.register = function (plugin, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    //var js = options.artifactRoot + path.join('js', util.format(options.bundleName + '.%s.js', pkg.version))
    //var css = options.artifactRoot + path.join('css', util.format(options.bundleName + '.%s.css', pkg.version));

    var js = options.artifactRoot + path.join('js', 'signup.min.js')
    var css = options.artifactRoot + path.join('css', 'signup.min.css');

    plugin.route({
        method: 'GET',
        path: '/signup',
        handler: function(request, response) {
            console.log('LOADING ABOUT');

            var props = {
                title: 'Boilerplate Test',
                js: js,
                css: css
            }

            // Hook into typescript generated files
            response.view('signup/Index.tsx', props);
        },
        config: {
            cors: true
        }
    });


    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
