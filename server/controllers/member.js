var    Article = require('../models/article');

function route(expressApp){
    expressApp.get('/member', 'member', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('member/list', {
            title: 'Members',
            listObjs: articles
        });
    });

    expressApp.get('/member/create', 'member.create', expressApp.restrict, function (req, res, next) {
        var articles = [new Article(), new Article()];
        res.render('member/create', {
            title: 'Members Create'
        });
    });

    expressApp.post('/member/', 'member.store', expressApp.restrict, function(req, res, next) {
        res.redirect('/member');
    });
}

module.exports = route;
