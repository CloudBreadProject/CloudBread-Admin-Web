var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/gameEventMember', 'gameEventMember', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('gameEventMember/list', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });

    expressApp.get('/gameEventMember/create', 'gameEventMember.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('gameEventMember/create', {
            title: 'GameEventMember Create'
        });
    });

    expressApp.post('/gameEventMember/', 'gameEventMember.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/gameEventMember');
    });
}

module.exports = route;
