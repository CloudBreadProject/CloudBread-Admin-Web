function route(expressApp){
    expressApp.get('/dashboard/v1', 'dashboard.v1', expressApp.restrict, function (req, res) {
        res.render('admin-lte/dashboard/v1', {
            title: 'Blank Page'
        });
    });

    expressApp.get('/dashboard/v2', 'dashboard.v2', expressApp.restrict, function (req, res) {
        res.render('admin-lte/dashboard/v2', {
            title: 'Blank Page'
        });
    });

    expressApp.get('/user/profile', 'user.profile', expressApp.restrict, function (req, res) {
        res.render('admin-lte/user/profile', {
            title: 'Profile'
        });
    });

    expressApp.get('/widgets/index', 'widgets.index', expressApp.restrict, function (req, res) {
        res.render("admin-lte/widgets/index", {
            title: "Widgets"
        })
    });

    expressApp.get('/charts.chartjs', 'charts.chartjs', expressApp.restrict, function (req, res) {
        res.render("admin-lte/charts/chart-js", {
            title: "ChartJS"
        })
    });

    expressApp.get('/charts/morris', 'charts.morris', expressApp.restrict, function (reqt, res) {
        res.render("admin-lte/charts/morris", {
            title: "Morris"
        })
    });

    expressApp.get('/charts/flot', 'charts.flot', expressApp.restrict, function (reqt, res) {
        res.render("admin-lte/charts/flot", {
            title: "Flot"
        })
    });

    expressApp.get('/ui-elements/general', 'ui-elements.general', expressApp.restrict, function (req, res) {
        res.render("admin-lte/ui-elements/general", {
            title: "General"
        })
    });

    expressApp.get('/ui-elements/icons', 'ui-elements.icons', expressApp.restrict, function (req, res) {
        res.render("admin-lte/ui-elements/icons", {
            title: "Icons"
        })
    });
    expressApp.get('/ui-elements/buttons', 'ui-elements.buttons', expressApp.restrict, function (req, res) {
        res.render("admin-lte/ui-elements/buttons", {
            title: "Buttons"
        })
    });

    expressApp.get('/ui-elements/sliders', 'ui-elements.sliders', expressApp.restrict, function (req, res) {
        res.render("admin-lte/ui-elements/sliders", {
            title: "Sliders"
        })
    });

    expressApp.get('/ui-elements/timeline', 'ui-elements.timeline', expressApp.restrict, function (req, res) {
        res.render("admin-lte/ui-elements/timeline", {
            title: "Timeline"
        })
    });

    expressApp.get('/ui-elements/modals', 'ui-elements.modals', expressApp.restrict, function (req, res) {
        res.render("admin-lte/ui-elements/modals", {
            title: "Modals"
        })
    });


    expressApp.get('/forms/general', 'forms.general', expressApp.restrict, function (req, res) {
        res.render("admin-lte/forms/general", {
            title: "General"
        });
    });

    expressApp.get('/forms/advanced', 'forms.advanced', expressApp.restrict, function (req, res) {
        res.render("admin-lte/forms/advanced", {
            title: "Advanced"
        });
    });

    expressApp.get('/forms/editors', 'forms.editors', expressApp.restrict, function (req, res) {
        res.render("admin-lte/forms/editors", {
            title: "Editors"
        });
    });

    expressApp.get('/tables/simple', 'tables.simple', expressApp.restrict, function (req, res) {
        res.render("admin-lte/tables/simple", {
            title: "Simple"
        });
    });

    expressApp.get('/tables/dataTables', 'tables.dataTables', expressApp.restrict, function (req, res) {
        res.render("admin-lte/tables/data-tables", {
            title: "Data Tables"
        });
    });

    expressApp.get('/calendar/index', 'calendar.index', expressApp.restrict, function (req, res) {
        res.render("admin-lte/calendar/index", {
            title: "Calendar"
        });
    });

    expressApp.get('/mailbox/index', 'mailbox.index', expressApp.restrict, function (req, res) {
        res.render("admin-lte/mailbox/index", {
            title: "Mailbox"
        });
    });

    expressApp.get('/mailbox/compose', 'mailbox.compose', expressApp.restrict, function (req, res) {
        res.render("admin-lte/mailbox/compose", {
            title: "Compose"
        });
    });

    expressApp.get('/mailbox/readMail', 'mailbox.readMail', expressApp.restrict, function (req, res) {
        res.render("admin-lte/mailbox/read-mail", {
            title: "Read Mail"
        });
    });

    expressApp.get('/examples/invoice', 'examples.invoice', expressApp.restrict, function (req, res) {
        res.render("admin-lte/examples/invoice", {
            title: "Invoice"
        });
    });

    expressApp.get('/examples/invoicePrint', 'examples.invoicePrint', expressApp.restrict, function (req, res) {
        res.render("admin-lte/examples/invoice-print", {
            title: "Invoice Print",
            layout: false
        });
    });

    expressApp.get('/charts/inlineCharts', 'charts.inlineCharts', expressApp.restrict, function (req, res) {
        res.render("admin-lte/charts/inlineCharts", {
            title: "inlineCharts"
        })
    });

    expressApp.get('/user/lockscreen', 'user.lockscreen', expressApp.restrict, function (req, res) {
        res.render('admin-lte/user/lockscreen', {
            title: 'Lock Screen',
            layout: 'lockscreen'
        });
    });
}

module.exports = route;
