var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/appUserLog', 'appUserLog', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('appUserLog/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/appUserLog/create', 'appUserLog.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('appUserLog/create', {
            title: 'GameEvent Create'
        });
    });

    expressApp.post('/appUserLog/', 'appUserLog.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/appUserLog');
    });}

module.exports = route;
