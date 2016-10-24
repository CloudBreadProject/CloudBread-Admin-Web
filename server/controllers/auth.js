var passport = require('passport');
var flash = require('connect-flash');


function route(expressApp) {

    expressApp.get('/login', 'login', function (req, res) {

        res.render("auth/login", {
            title: "login",
            layout: 'auth',
            message: req.flash('error')[0]
        });
    });

    expressApp.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res, next) {
        req.session.save(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
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
}

module.exports = route;
