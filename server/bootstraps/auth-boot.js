
var restrict = function restrict(req, res, next) {
    next();
    //if (req.session.user) {
    //  next();
    //} else {
    //  req.session.error = 'Access denied!';
    //  res.redirect('/login');
    //}
};

function AuthBoot(expressApp){
    //register auth restrict.
    expressApp.restrict = restrict;


}

module.exports = AuthBoot;
