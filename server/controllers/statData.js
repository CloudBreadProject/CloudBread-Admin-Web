var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/statData', 'statData', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('statData/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/statData/create', 'statData.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('statData/create', {
            title: 'GameEvent Create'
        });
    });

    expressApp.post('/statData/', 'statData.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/statData');
    });}

module.exports = route;
