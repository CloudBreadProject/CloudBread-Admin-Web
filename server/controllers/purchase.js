var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/purchase', 'purchase', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('purchase/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/purchase/create', 'purchase.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('purchase/create', {
            title: 'GameEvent Create'
        });
    });

    expressApp.post('/purchase/', 'purchase.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/purchase');
    });
}

module.exports = route;
