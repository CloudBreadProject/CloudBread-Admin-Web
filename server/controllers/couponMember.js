var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/couponMember', 'couponMember', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('couponMember/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/couponMember/create', 'couponMember.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('couponMember/create', {
            title: 'Coupon Member Create'
        });
    });

    expressApp.post('/couponMember/', 'couponMember.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/couponMember');
    });}

module.exports = route;
