var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var restrict = function restrict(req, res, next) {

    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

function AuthBoot(expressApp){

    passport.use(new LocalStrategy({
            usernameField: 'AdminMemberID',
            passwordField: 'password'
        },
        function(adminMemberId, password, done) {
            expressApp.models.AdminMembers.findOne({
                    where: {
                        AdminMemberID: adminMemberId,
                        AdminMemberPWD : password
                    }
                })
                .then(function(adminMember){

                    if(adminMember == null){
                        return done(null, false, { message: 'Invalid username or password.' });
                    }else{
                        return done(null, adminMember);
                    }

                }).catch(function(err) {
                return done(null, false, { message: 'Fail to login.' });
            });
        }
    ));

    expressApp.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());
    expressApp.restrict = restrict;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
}

module.exports = AuthBoot;
