var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/serverInfo', 'serverInfo', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('serverInfo/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/serverInfo/create', 'serverInfo.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('serverInfo/create', {
            title: 'GameEvent Create'
        });
    });

    expressApp.post('/serverInfo/', 'serverInfo.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/serverInfo');
    });}

module.exports = route;
