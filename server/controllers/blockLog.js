var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/blockLog', 'blockLog', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('blockLog/list', {
            title: 'Item List',
            articles: articles
        });
    });

    expressApp.get('/blockLog/create', 'blockLog.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('blockLog/create', {
            title: 'blockLog Create'
        });
    });

    expressApp.post('/blockLog/', 'blockLog.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/blockLog');
    });
}

module.exports = route;
