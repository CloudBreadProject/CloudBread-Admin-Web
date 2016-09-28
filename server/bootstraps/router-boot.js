var Router = require('named-routes');

function RouterBoot(expressApp) {
    var router = new Router();
    router.extendExpress(expressApp);
    router.registerAppHelpers(expressApp);

    expressApp.set('router', router);

    expressApp.get('/dashboard/v1', 'dashboard.v1', function (req, res) {
        res.render('dashboard/v1', {
            title: 'Blank Page'
        });
    });

    expressApp.get('/dashboard/v2', 'dashboard.v2', function (req, res) {
        res.render('dashboard/v2', {
            title: 'Blank Page'
        });
    });

    expressApp.get('/user/profile', 'user.profile', function (req, res) {
        res.render('user/profile', {
            title: 'Profile'
        });
    });

    expressApp.get('/widgets/index', 'widgets.index', function (req, res) {
        res.render("widgets/index", {
            title: "Widgets"
        })
    });

    expressApp.get('/charts.chartjs', 'charts.chartjs', function(req, res){
        res.render("charts/chart-js", {
            title: "ChartJS"
        })
    });

    expressApp.get('/charts/morris', 'charts.morris', function(reqt, res) {
        res.render("charts/morris", {
            title: "Morris"
        })
    });

    expressApp.get('/charts/flot', 'charts.flot', function(reqt, res) {
        res.render("charts/flot", {
            title: "Flot"
        })
    });

    expressApp.get('/ui-elements/general', 'ui-elements.general' ,function(req, res) {
        res.render("ui-elements/general", {
            title: "General"
        })
    });

    expressApp.get('/ui-elements/icons', 'ui-elements.icons', function(req, res) {
        res.render("ui-elements/icons", {
            title: "Icons"
        })
    });
    expressApp.get('/ui-elements/buttons', 'ui-elements.buttons', function(req, res) {
        res.render("ui-elements/buttons", {
            title: "Buttons"
        })
    });

    expressApp.get('/ui-elements/sliders', 'ui-elements.sliders', function(req, res) {
        res.render("ui-elements/sliders", {
            title: "Sliders"
        })
    });

    expressApp.get('/ui-elements/timeline', 'ui-elements.timeline', function(req, res) {
        res.render("ui-elements/timeline", {
            title: "Timeline"
        })
    });

    expressApp.get('/ui-elements/modals', 'ui-elements.modals', function(req, res) {
        res.render("ui-elements/modals", {
            title: "Modals"
        })
    });


    expressApp.get('/forms/general', 'forms.general' ,function(req, res) {
        res.render("forms/general", {
            title: "General"
        });
    });

    expressApp.get('/forms/advanced', 'forms.advanced' ,function(req, res) {
        res.render("forms/advanced", {
            title: "Advanced"
        });
    });

    expressApp.get('/forms/editors', 'forms.editors' ,function(req, res) {
        res.render("forms/editors", {
            title: "Editors"
        });
    });

    expressApp.get('/tables/simple', 'tables.simple' ,function(req, res) {
        res.render("tables/simple", {
            title: "Simple"
        });
    });

    expressApp.get('/tables/dataTables', 'tables.dataTables' ,function(req, res) {
        res.render("tables/data-tables", {
            title: "Data Tables"
        });
    });

    expressApp.get('/calendar/index', 'calendar.index', function(req, res) {
        res.render("calendar/index", {
            title: "Calendar"
        });
    });

    expressApp.get('/mailbox/index', 'mailbox.index' ,function(req, res) {
        res.render("mailbox/index", {
            title: "Mailbox"
        });
    });

    expressApp.get('/mailbox/compose', 'mailbox.compose' ,function(req, res) {
        res.render("mailbox/compose", {
            title: "Compose"
        });
    });

    expressApp.get('/mailbox/readMail', 'mailbox.readMail' ,function(req, res) {
        res.render("mailbox/read-mail", {
            title: "Read Mail"
        });
    });

    expressApp.get('/examples/invoice', 'examples.invoice' , function(req, res) {
        res.render("examples/invoice", {
            title: "Invoice"
        });
    });

    expressApp.get('/examples/invoicePrint', 'examples.invoicePrint' ,function(req, res) {
        res.render("examples/invoice-print", {
            title: "Invoice Print",
            layout: false
        });
    });

    expressApp.get('/charts/inlineCharts', 'charts.inlineCharts', function(reqt, res) {
        res.render("charts/inlineCharts", {
            title: "inlineCharts"
        })
    });

    expressApp.get('/user/lockscreen', 'user.lockscreen' ,function(req, res) {
        res.render('user/lockscreen', {
            title: 'Lock Screen',
            layout: 'lockscreen'
        });
    });

    expressApp.get('/user/login', 'user.login' ,function(req, res) {
        res.render('user/login', {
            title: 'Login',
            layout: 'auth'
        });
    });

    expressApp.get('/user/register', 'user.register' ,function(req, res) {
        res.render('user/register', {
            title: 'Register',
            layout: 'auth'
        });
    });

    expressApp.get('/user/profile', 'user.profile' ,function(req, res) {
        res.render('user/profile', {
            title: 'Profile'
        });
    });

    expressApp.get('/user/new', 'user.new' ,function(req, res) {
        res.render('user/new', {
            title: 'New User'
        });
    });

    expressApp.get('/user/list', 'user.list', function (req, res) {
        res.render("crud-user/list", {
            title: 'List Users',
            crud_user: results
        });
    });

    expressApp.get('/login', 'login', function(req, res) {
        res.render('user/login', {
            title: 'Login',
            layout: 'auth'
        });
    });

    expressApp.get('/logout', 'logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    expressApp.get('/documentation', 'documentation.index' ,function(req, res) {
        res.render("documentation/index", {
            title: "Documentation",
            layout: false
        });
    });

    expressApp.get('/', function (req, res) {
        res.render('home');
        //res.render('/dashboard/index', {
        //    title: 'Blank Page'
        //});
    });
}

module.exports = RouterBoot;


