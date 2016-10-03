var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/adminMember', 'adminMember', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('adminMember/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/adminMember/create', 'adminMember.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('adminMember/create', {
            title: 'AdminMember Create'
        });
    });

    expressApp.post('/adminMember/', 'adminMember.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/adminMember');
    });
}

module.exports = route;
