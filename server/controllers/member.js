var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/member', 'member', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('member/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });
}

module.exports = route;
