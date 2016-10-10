function route(expressApp){

    expressApp.get('/member', 'member', expressApp.restrict, function (req, res) {
        expressApp.models.Members.findAll().then(function(results) {
            res.render('member/list', {
                title: 'Members',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/member/:id', 'member.show', expressApp.restrict, function(req, res) {
        var memberId = req.params.id;
        expressApp.models.Members.findOne({
            where: {
                MemberID: memberId
            }
        })
        .then(function(result){
            res.render('member/edit', {
                title: 'Members',
                obj : result
            });
        }).catch(function(err) {
            next(err);
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

    expressApp.post('/member/edit', 'member.update', expressApp.restrict, function(req, res) {
        res.redirect('/member');
    });
}

module.exports = route;
