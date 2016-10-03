var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/gameEvent', 'gameEvent', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('gameEvent/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/gameEvent/create', 'gameEvent.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('gameEvent/create', {
            title: 'GameEvent Create'
        });
    });

    expressApp.post('/gameEvent/', 'gameEvent.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/gameEvent');
    });}

module.exports = route;
