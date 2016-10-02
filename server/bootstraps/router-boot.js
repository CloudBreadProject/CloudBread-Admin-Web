var Router = require('named-routes');

function RouterBoot(expressApp) {
    var router = new Router();
    router.extendExpress(expressApp);
    router.registerAppHelpers(expressApp);
    var restrict = expressApp.restrict;

    expressApp.set('router', router);

    expressApp.get('/dashboard/v1', 'dashboard.v1', restrict, function (req, res) {
        res.render('dashboard/v1', {
            title: 'Blank Page'
        });
    });

    expressApp.get('/dashboard/v2', 'dashboard.v2', restrict, function (req, res) {
        res.render('dashboard/v2', {
            title: 'Blank Page'
        });
    });

    expressApp.get('/user/profile', 'user.profile', restrict, function (req, res) {
        res.render('user/profile', {
            title: 'Profile'
        });
    });

    expressApp.get('/widgets/index', 'widgets.index', restrict, function (req, res) {
        res.render("widgets/index", {
            title: "Widgets"
        })
    });

    expressApp.get('/charts.chartjs', 'charts.chartjs', restrict, function (req, res) {
        res.render("charts/chart-js", {
            title: "ChartJS"
        })
    });

    expressApp.get('/charts/morris', 'charts.morris', restrict, function (reqt, res) {
        res.render("charts/morris", {
            title: "Morris"
        })
    });

    expressApp.get('/charts/flot', 'charts.flot', restrict, function (reqt, res) {
        res.render("charts/flot", {
            title: "Flot"
        })
    });

    expressApp.get('/ui-elements/general', 'ui-elements.general', restrict, function (req, res) {
        res.render("ui-elements/general", {
            title: "General"
        })
    });

    expressApp.get('/ui-elements/icons', 'ui-elements.icons', restrict, function (req, res) {
        res.render("ui-elements/icons", {
            title: "Icons"
        })
    });
    expressApp.get('/ui-elements/buttons', 'ui-elements.buttons', restrict, function (req, res) {
        res.render("ui-elements/buttons", {
            title: "Buttons"
        })
    });

    expressApp.get('/ui-elements/sliders', 'ui-elements.sliders', restrict, function (req, res) {
        res.render("ui-elements/sliders", {
            title: "Sliders"
        })
    });

    expressApp.get('/ui-elements/timeline', 'ui-elements.timeline', restrict, function (req, res) {
        res.render("ui-elements/timeline", {
            title: "Timeline"
        })
    });

    expressApp.get('/ui-elements/modals', 'ui-elements.modals', restrict, function (req, res) {
        res.render("ui-elements/modals", {
            title: "Modals"
        })
    });


    expressApp.get('/forms/general', 'forms.general', restrict, function (req, res) {
        res.render("forms/general", {
            title: "General"
        });
    });

    expressApp.get('/forms/advanced', 'forms.advanced', restrict, function (req, res) {
        res.render("forms/advanced", {
            title: "Advanced"
        });
    });

    expressApp.get('/forms/editors', 'forms.editors', restrict, function (req, res) {
        res.render("forms/editors", {
            title: "Editors"
        });
    });

    expressApp.get('/tables/simple', 'tables.simple', restrict, function (req, res) {
        res.render("tables/simple", {
            title: "Simple"
        });
    });

    expressApp.get('/tables/dataTables', 'tables.dataTables', restrict, function (req, res) {
        res.render("tables/data-tables", {
            title: "Data Tables"
        });
    });

    expressApp.get('/calendar/index', 'calendar.index', restrict, function (req, res) {
        res.render("calendar/index", {
            title: "Calendar"
        });
    });

    expressApp.get('/mailbox/index', 'mailbox.index', restrict, function (req, res) {
        res.render("mailbox/index", {
            title: "Mailbox"
        });
    });

    expressApp.get('/mailbox/compose', 'mailbox.compose', restrict, function (req, res) {
        res.render("mailbox/compose", {
            title: "Compose"
        });
    });

    expressApp.get('/mailbox/readMail', 'mailbox.readMail', restrict, function (req, res) {
        res.render("mailbox/read-mail", {
            title: "Read Mail"
        });
    });

    expressApp.get('/examples/invoice', 'examples.invoice', restrict, function (req, res) {
        res.render("examples/invoice", {
            title: "Invoice"
        });
    });

    expressApp.get('/examples/invoicePrint', 'examples.invoicePrint', restrict, function (req, res) {
        res.render("examples/invoice-print", {
            title: "Invoice Print",
            layout: false
        });
    });

    expressApp.get('/charts/inlineCharts', 'charts.inlineCharts', restrict, function (req, res) {
        res.render("charts/inlineCharts", {
            title: "inlineCharts"
        })
    });

    expressApp.get('/user/lockscreen', 'user.lockscreen', restrict, function (req, res) {
        res.render('user/lockscreen', {
            title: 'Lock Screen',
            layout: 'lockscreen'
        });
    });

    expressApp.get('/user/login', 'user.login', restrict, function (req, res) {
        res.render('user/login', {
            title: 'Login',
            layout: 'auth'
        });
    });

    expressApp.get('/user/register', 'user.register', restrict, function (req, res) {
        res.render('user/register', {
            title: 'Register',
            layout: 'auth'
        });
    });

    expressApp.get('/user/profile', 'user.profile', restrict, function (req, res) {
        res.render('user/profile', {
            title: 'Profile'
        });
    });

    expressApp.get('/user/new', 'user.new', restrict, function (req, res) {
        res.render('user/new', {
            title: 'New User'
        });
    });

    expressApp.get('/user/list', 'user.list', restrict, function (req, res) {
        res.render("crud-user/list", {
            title: 'List Users',
            crud_user: results
        });
    });

    expressApp.get('/documentation', 'documentation.index', restrict, function (req, res) {
        res.render("documentation/index", {
            title: "Documentation",
            layout: false
        });
    });

    expressApp.get('/login', 'login', function (req, res) {
        res.render("user/login", {
            title: "login",
            layout: 'auth'
        });
    });

    expressApp.get('/logout', 'logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

    expressApp.get('/register', 'register', function (req, res) {
        res.render("user/register", {
            title: "register",
            layout: 'auth'
        });
    });

    // expressApp.get('/', 'main', restrict, function (req, res) {
    //     res.render('home');
    // });
}

module.exports = RouterBoot;


