var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/appSystemLog', 'appSystemLog', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('appSystemLog/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/appSystemLog/create', 'appSystemLog.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('appSystemLog/create', {
            title: 'GameEvent Create'
        });
    });

    expressApp.post('/appSystemLog/', 'appSystemLog.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/appSystemLog');
    });}

module.exports = route;
