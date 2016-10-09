var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/notice', 'notice', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('notice/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/notice/create', 'notice.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('notice/create', {
            title: 'GameEvent Create'
        });
    });

    expressApp.post('/notice/', 'notice.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/purchase');
    });}

module.exports = route;
