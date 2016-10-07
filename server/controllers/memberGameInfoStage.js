var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/memberGameInfoStage', 'memberGameInfoStage', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('memberGameInfoStage/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/memberGameInfoStage/create', 'memberGameInfoStage.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('memberGameInfoStage/create', {
            title: 'GameEvent Create'
        });
    });

    expressApp.post('/memberGameInfoStage/', 'memberGameInfoStage.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/memberGameInfoStage');
    });}

module.exports = route;
