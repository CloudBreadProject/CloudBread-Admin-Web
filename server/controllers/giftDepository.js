var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/giftDepository', 'giftDepository', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('giftDepository/list', {
            title: 'Gift Depository',
            articles: articles
        });
    });

    expressApp.get('/giftDepository/create', 'giftDepository.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('giftDepository/create', {
            title: 'giftDepository Create'
        });
    });

    expressApp.post('/giftDepository/', 'giftDepository.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/giftDepository');
    });
}

module.exports = route;
