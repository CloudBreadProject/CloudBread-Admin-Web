function route(expressApp){

    expressApp.get('/gameEventMember', 'gameEventMember', expressApp.restrict, function (req, res) {
        expressApp.models.GameEventMember.findAll().then(function(results) {
            res.render('gameEventMember/list', {
                title: 'Members',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/gameEventMember/:id', 'gameEventMember.show', expressApp.restrict, function(req, res) {
        var gameEventMemberId = req.params.id;
        expressApp.models.GameEventMember.findOne({
            where: {
                GameEventMemberID: gameEventMemberId
            }
        })
        .then(function(result){
            res.render('gameEventMember/edit', {
                title: 'GameEventMember',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/gameEventMember/create', 'gameEventMember.create', expressApp.restrict, function (req, res) {

        res.render('gameEventMember/create', {
            title: 'GameEventMembers Create'
        });
    });

    expressApp.post('/gameEventMember/', 'gameEventMember.store', expressApp.restrict, function(req, res) {
        res.redirect('/gameEventMember');
    });

    expressApp.post('/gameEventMember/edit', 'gameEventMember.update', expressApp.restrict, function(req, res) {
        res.redirect('/gameEventMember');
    });
}

module.exports = route;
