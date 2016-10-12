var express = require('express');
var glob = require('glob');
var session = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

var HandlebarBoot = require('./bootstraps/handlebar-boot');
var RouterBoot = require('./bootstraps/router-boot');
var AuthBoot = require('./bootstraps/auth-boot');



module.exports = function(app, config) {
    var env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    // Public assets
    app.use('/public', express.static(config.root + '/public'));
    app.use('/admin', express.static(config.root + '/public'));

    // app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(compress());
    app.use(methodOverride());

    app.use(session({
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
        secret: 'dev-session'
    }));

    HandlebarBoot(app, config.root + '/server/views');
    AuthBoot(app);
    RouterBoot(app, AuthBoot);

    var controllers = glob.sync(config.root + '/server/controllers/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app);
    });

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if(app.get('env') === 'development'){
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    var models = require("./models"); //추가한 부분.
    app.models = models;

     app.use(function (err, req, res, next) {
         res.status(err.status || 500);
         res.render('error', {
             message: err.message,
             error: {},
             title: 'error'
         });
     });

    app.use(function (err, request, response, next) {
        var page, title, layout;

        if (request.session.user) {
            layout = 'main';
        } else {
            layout = 'auth'
        }
        if (err.status == 404) {
            page = 'errors/404';
            title = err.status + ' ' + err.message;
        } else {
            page = 'errors/500';
            title = '500 Internal Server Error';
        }

        response.status(err.status || 500);

        if (app.get('env') !== 'development') err = {};

        response.render(page, {
            message: err.message,
            error: err,
            title: title,
            layout: layout
        });
    });
};

