var express = require('express');
var session      = require('express-session');
var bodyParser = require('body-parser');
var path         = require('path');
var Router       = require('named-routes');
var exphbs = require('express-handlebars');

var app = express();

var alePath = path.join(__dirname, '../resources/admin-lte/');
var viewsPath = alePath + 'views/';
var assetsPath = alePath + 'assets/';

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
    cache : false,
    layoutsDir: viewsPath + 'layouts/',
    partialsDir: viewsPath + 'partials/',
    helpers: {
        url: function(routeName, params) {
            return app.locals.url(routeName, params);
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


// Set router
app.set('router', router);

app.get('/dashboard/v1', 'dashboard.v1', function (req, res) {
    res.render('dashboard/v1', {
        title: 'Blank Page'
    });
});

app.get('/dashboard/v2', 'dashboard.v2', function (req, res) {
    res.render('dashboard/v2', {
        title: 'Blank Page'
    });
});

app.get('/user/profile', 'user.profile', function (req, res) {
    res.render('user/profile', {
        title: 'Profile'
    });
});

app.get('/widgets/index', 'widgets.index', function (req, res) {
    res.render("widgets/index", {
        title: "Widgets"
    })
});

app.get('/charts.chartjs', 'charts.chartjs', function(req, res){
    res.render("charts/chart-js", {
        title: "ChartJS"
    })
});

app.get('/charts/morris', 'charts.morris', function(reqt, res) {
    res.render("charts/morris", {
        title: "Morris"
    })
});

app.get('/charts/flot', 'charts.flot', function(reqt, res) {
    res.render("charts/flot", {
        title: "Flot"
    })
});

app.get('/ui-elements/general', 'ui-elements.general' ,function(req, res) {
    res.render("ui-elements/general", {
        title: "General"
    })
});

app.get('/ui-elements/icons', 'ui-elements.icons', function(req, res) {
    res.render("ui-elements/icons", {
        title: "Icons"
    })
});
app.get('/ui-elements/buttons', 'ui-elements.buttons', function(req, res) {
    res.render("ui-elements/buttons", {
        title: "Buttons"
    })
});
app.get('/ui-elements/sliders', 'ui-elements.sliders', function(req, res) {
    res.render("ui-elements/sliders", {
        title: "Sliders"
    })
});
app.get('/ui-elements/timeline', 'ui-elements.timeline', function(req, res) {
    res.render("ui-elements/timeline", {
        title: "Timeline"
    })
});
app.get('/ui-elements/modals', 'ui-elements.modals', function(req, res) {
    res.render("ui-elements/modals", {
        title: "Modals"
    })
});


app.get('/forms/general', 'forms.general' ,function(req, res) {
    res.render("forms/general", {
        title: "General"
    });
});
app.get('/forms/advanced', 'forms.advanced' ,function(req, res) {
    res.render("forms/advanced", {
        title: "Advanced"
    });
});
app.get('/forms/editors', 'forms.editors' ,function(req, res) {
    res.render("forms/editors", {
        title: "Editors"
    });
});

app.get('/tables/simple', 'tables.simple' ,function(req, res) {
    res.render("tables/simple", {
        title: "Simple"
    });
});
app.get('/tables/dataTables', 'tables.dataTables' ,function(req, res) {
    res.render("tables/data-tables", {
        title: "Data Tables"
    });
});

app.get('/calendar/index', 'calendar.index', function(req, res) {
    res.render("calendar/index", {
        title: "Calendar"
    });
});

app.get('/mailbox/index', 'mailbox.index' ,function(req, res) {
    res.render("mailbox/index", {
        title: "Mailbox"
    });
});
app.get('/mailbox/compose', 'mailbox.compose' ,function(req, res) {
    res.render("mailbox/compose", {
        title: "Compose"
    });
});
app.get('/mailbox/readMail', 'mailbox.readMail' ,function(req, res) {
    res.render("mailbox/read-mail", {
        title: "Read Mail"
    });
});

app.get('/examples/invoice', 'examples.invoice' , function(req, res) {
    res.render("examples/invoice", {
        title: "Invoice"
    });
});

app.get('/examples/invoicePrint', 'examples.invoicePrint' ,function(req, res) {
    res.render("examples/invoice-print", {
        title: "Invoice Print",
        layout: false
    });
});

app.get('/charts/inlineCharts', 'charts.inlineCharts', function(reqt, res) {
    res.render("charts/inlineCharts", {
        title: "inlineCharts"
    })
});

app.get('/user/lockscreen', 'user.lockscreen' ,function(req, res) {
    res.render('user/lockscreen', {
        title: 'Lock Screen',
        layout: 'lockscreen'
    });
});
app.get('/user/login', 'user.login' ,function(req, res) {
    res.render('user/login', {
        title: 'Login',
        layout: 'auth'
    });
});
app.get('/user/register', 'user.register' ,function(req, res) {
    res.render('user/register', {
        title: 'Register',
        layout: 'auth'
    });
});
app.get('/user/profile', 'user.profile' ,function(req, res) {
    res.render('user/profile', {
        title: 'Profile'
    });
});

app.get('/user/new', 'user.new' ,function(req, res) {
    res.render('user/new', {
        title: 'New User'
    });
});

app.get('/user/list', 'user.list', function (req, res) {
    res.render("crud-user/list", {
        title: 'List Users',
        crud_user: results
    });
});

app.get('/login', 'login', function(req, res) {
    res.render('user/login', {
        title: 'Login',
        layout: 'auth'
    });
});

app.get('/logout', 'logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

app.get('/documentation', 'documentation.index' ,function(req, res) {
    res.render("documentation/index", {
        title: "Documentation",
        layout: false
    });
});

app.get('/', function (req, res) {
    res.render('home');
    //res.render('/dashboard/index', {
    //    title: 'Blank Page'
    //});
});

module.exports = app;
