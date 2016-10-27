function route(expressApp){

    expressApp.get('/gameEventMember', 'gameEventMember', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.GameEventMember;

        Model.findAll({
                where : filter
            })
            .then(function(filteredModel) {
                var count = filteredModel.length;

                Model.findAll({
                        where : filter,
                        limit : perPage,
                        offset : (currentPage <= 1) ? 0 : perPage*(currentPage-1)
                    })
                    .then(function (results) {
                        res.render('gameEventMember/list', {
                            title: 'Game Event Members',
                            listObjs: results,
                            page:currentPage,
                            count:count
                        });
                    }).catch(function (err) {
                    next(err);
                });

            }).catch(function(err){
            next(err);
        });
    });

    expressApp.get('/gameEventMember/create', 'gameEventMember.create', expressApp.restrict, function (req, res) {

        res.render('gameEventMember/create', {
            title: 'GameEventMembers Create'
        });
    });

    expressApp.get('/gameEventMember/delete/:id', 'gameEventMember.delete', expressApp.restrict, function(req, res, next) {
        var gameEventMemberId = req.params.id;
        expressApp.models.GameEventMember.findOne({
            where: {
                GameEventMemberID: gameEventMemberId
            }
        })
        .then(function(result){
            res.render('gameEventMember/delete', {
                title: 'GameEventMember Delete',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.delete("/gameEventMember/delete/:id", function(req,res, next){
        var gameEventMemberId = req.params.id;
        expressApp.models.GameEventMember.destroy({
            where: {
                GameEventMemberID: gameEventMemberId
            }
        })
            .then(function(result){
                console.log(result);
                res.redirect('/gameEventMember');
            })
            .catch(function(err) {
                next(err);
            });
    });

    expressApp.get('/gameEventMember/:id', 'gameEventMember.show', expressApp.restrict, function(req, res, next) {
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

    expressApp.post('/gameEventMember/', 'gameEventMember.store', expressApp.restrict, function(req, res, next) {
        var gameEventMember = req.body.gameEventMember;
        expressApp.models.GameEventMember.create({
            GameEventMemberID  : gameEventMember.GameEventMemberID
            , eventID : gameEventMember.eventID
            , MemberID : gameEventMember.MemberID

            , sCol1 : gameEventMember.sCol1 || ''
            , sCol2 : gameEventMember.sCol2 || ''
            , sCol3 : gameEventMember.sCol3 || ''
            , sCol4 : gameEventMember.sCol4 || ''
            , sCol5 : gameEventMember.sCol5 || ''
            , sCol6 : gameEventMember.sCol6 || ''
            , sCol7 : gameEventMember.sCol7 || ''
            , sCol8 : gameEventMember.sCol8 || ''
            , sCol9 : gameEventMember.sCol9 || ''
            , sCol10 : gameEventMember.sCol10 || ''

            , HideYN : gameEventMember.HideYN
            , DeleteYN : gameEventMember.DeleteYN
            , DataFromRegion : gameEventMember.DataFromRegion || ''
            , DataFromRegionDT : gameEventMember.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'

        }).then(function() {
            res.redirect('/gameEventMember');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/gameEventMember/edit', 'gameEventMember.update', expressApp.restrict, function(req, res, next) {
        var gameEventMember = req.body.gameEventMember;
        expressApp.models.GameEventMember.update({

            eventID : gameEventMember.eventID
            , MemberID : gameEventMember.MemberID

            , sCol1 : gameEventMember.sCol1 || ''
            , sCol2 : gameEventMember.sCol2 || ''
            , sCol3 : gameEventMember.sCol3 || ''
            , sCol4 : gameEventMember.sCol4 || ''
            , sCol5 : gameEventMember.sCol5 || ''
            , sCol6 : gameEventMember.sCol6 || ''
            , sCol7 : gameEventMember.sCol7 || ''
            , sCol8 : gameEventMember.sCol8 || ''
            , sCol9 : gameEventMember.sCol9 || ''
            , sCol10 : gameEventMember.sCol10 || ''

            , HideYN : gameEventMember.HideYN
            , DeleteYN : gameEventMember.DeleteYN
        }, {
            where : {GameEventMemberID  : gameEventMember.GameEventMemberID}
        }).then(function() {
            res.redirect('/gameEventMember');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
