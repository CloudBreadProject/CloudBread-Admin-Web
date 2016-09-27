var express = require('express');
var session      = require('express-session');
var bodyParser = require('body-parser');
var path         = require('path');
var HandlebarBoot   = require('./bootstraps/handlebar-boot');
var RouterBoot   = require('./bootstraps/router-boot');

var app = express();

var alePath = path.join(__dirname, '../resources/admin-lte/');
var viewsPath = alePath + 'views/';
var assetsPath = alePath + 'assets/';

// Config session
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'dev-session'
}));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

HandlebarBoot(app, viewsPath);
RouterBoot(app);

// Public assets
app.use('/public', express.static(path.join(assetsPath)));
app.use('/admin', express.static(path.join(assetsPath)));

// Session-persisted message middleware
app.use(function(req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

// error handlers
app.use(function(err, request, response, next) {
    var page, title, layout;

    if(false){
        if (request.session.user) {
            layout = 'main';
        } else {
            layout = 'auth'
        }
    }
    layout = 'main';
    if (err.status == 404) {
        page = 'errors/404';
        title = err.status + ' ' + err.message;
    } else {
        page = 'errors/500';
        title = '500 Internal Server Error';
    }

    response.status(err.status || 500);

    // development error handler
    // will print stacktrace
    if (app.get('env') !== 'development') err = {};

    response.render(page, {
        message: err.message,
        error: err,
        title: title,
        layout: layout
    });
});

module.exports = app;
