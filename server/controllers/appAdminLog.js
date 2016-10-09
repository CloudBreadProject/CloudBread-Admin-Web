var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/appAdminLog', 'appAdminLog', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('appAdminLog/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/appAdminLog/create', 'appAdminLog.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('appAdminLog/create', {
            title: 'GameEvent Create'
        });
    });

    expressApp.post('/appAdminLog/', 'appAdminLog.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/appAdminLog');
    });}

module.exports = route;
