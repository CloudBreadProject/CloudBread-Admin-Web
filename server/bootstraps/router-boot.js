var Router = require('named-routes');

function RouterBoot(expressApp) {
    var router = new Router();
    router.extendExpress(expressApp);
    router.registerAppHelpers(expressApp);
    var restrict = expressApp.restrict;

    expressApp.set('router', router);

    expressApp.get('/user/login', 'user.login', restrict, function (req, res) {
        res.render('admin-lte/user/login', {
            title: 'Login',
            layout: 'auth'
        });
    });

    expressApp.get('/user/register', 'user.register', restrict, function (req, res) {
        res.render('admin-lte/user/register', {
            title: 'Register',
            layout: 'auth'
        });
    });

    expressApp.get('/user/profile', 'user.profile', restrict, function (req, res) {
        res.render('admin-lte/user/profile', {
            title: 'Profile'
        });
    });

    expressApp.get('/user/new', 'user.new', restrict, function (req, res) {
        res.render('crud-user/new', {
            title: 'New User'
        });
    });

    expressApp.post('/user/create', 'user.create', restrict, function (req, res) {
        res.redirect('/');
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
        res.render("admin-lte/user/login", {
            title: "login",
            layout: 'auth'
        });
    });

    expressApp.get('/logout', 'logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

    expressApp.get('/register', 'register', function (req, res) {
        res.render("admin-lte/user/register", {
            title: "register",
            layout: 'auth'
        });
    });

    // expressApp.get('/', 'main', restrict, function (req, res) {
    //     res.render('home');
    // });
}

module.exports = RouterBoot;


