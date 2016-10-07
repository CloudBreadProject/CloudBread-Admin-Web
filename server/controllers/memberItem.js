var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/memberItem', 'memberItem', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('memberItem/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/memberItem/create', 'memberItem.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('memberItem/create', {
            title: 'Coupon Create'
        });
    });

    expressApp.post('/memberItem/', 'memberItem.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/coupon');
    });

}

module.exports = route;
