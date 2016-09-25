var express = require('express');
var session      = require('express-session');
var bodyParser = require('body-parser');
var path         = require('path');
var Router       = require('named-routes');
var exphbs = require('express-handlebars');

var app = express();
var alePath = __dirname + '/../node_modules/admin-lte-express';
var viewsPath = alePath + '/views';
var publicPath = alePath + '/public';

// Config named routes
var router = new Router();
router.extendExpress(app);
router.registerAppHelpers(app);

// Config session
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'dev-session'
}));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var blocks = [];
var activeRoute = '';
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: viewsPath + '/layouts/',
    partialsDir: viewsPath + '/partials/',
    helpers: {
        url: function(routeName, params) {
            return routeName;
        },
        activeRoute: function(routeName) {
            return routeName === activeRoute ? 'active' : '';
        },
        activeRoutes: function(routeNames) {
            //return routeNames;
            return routeNames.split(',').indexOf(activeRoute) >= 0 ? 'active' : '';
        },
        block: function(name) {
            var val = (blocks[name] || []).join('\n');

            // clear the block
            blocks[name] = [];
            return val;
        },
        extend: function(name, context) {
            var block = blocks[name];
            if (!block) {
                block = blocks[name] = [];
            }
            block.push(context.fn(this));
        }
    }
}));

app.set('views', viewsPath);
app.set('view engine', 'handlebars');

// Public assets
app.use('/public', express.static(path.join(publicPath)));
app.use('/admin', express.static(path.join(publicPath)));

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

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
        page = 'errors/500'
        title = '500 Internal Server Error'
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


// Set router
app.set('router', router);

app.set('dashboard/v1', 'dashboard.v1', function (req, res) {
    res.render('dashboard/index', {
        title: 'Blank Page'
    });
});

app.get('/', function (req, res) {
    res.render('dashboard/index', {
        title: 'Blank Page'
    });
});

module.exports = app;
