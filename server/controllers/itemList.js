var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/itemList', 'itemList', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('itemList/list', {
            title: 'Item List',
            articles: articles
        });
    });

    expressApp.get('/itemList/create', 'itemList.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('itemList/create', {
            title: 'itemList Create'
        });
    });

    expressApp.post('/itemList/', 'itemList.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/itemList');
    });
}

module.exports = route;
