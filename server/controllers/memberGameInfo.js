var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/memberGameInfo', 'memberGameInfo', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('memberGameInfo/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/memberGameInfo/create', 'memberGameInfo.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('memberGameInfo/create', {
            title: 'GameEvent Create'
        });
    });

    expressApp.post('/memberGameInfo/', 'memberGameInfo.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/memberGameInfo');
    });}

module.exports = route;
