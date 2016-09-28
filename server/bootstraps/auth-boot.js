

function AuthBoot(expressApp){
    expressApp.use(function (req, res, next) {
        next();
        //console.log(req);
        //console.log(req.url);
        //if (req.url == '/login')
        //    next();
        //if (req.session.user) {
        //  next();
        //} else {
        //  req.session.error = 'Access denied!';
        //  res.redirect('/login');
        //}
    });
}

module.exports = AuthBoot;
