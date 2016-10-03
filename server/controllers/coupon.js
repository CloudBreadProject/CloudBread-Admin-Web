var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/coupon', 'coupon', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('coupon/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/coupon/create', 'coupon.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('coupon/create', {
            title: 'Coupon Create'
        });
    });

    expressApp.post('/coupon/', 'coupon.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/coupon');
    });
}

module.exports = route;
