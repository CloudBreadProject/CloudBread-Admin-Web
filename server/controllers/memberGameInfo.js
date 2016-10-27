function route(expressApp){

    expressApp.get('/memberGameInfo', 'memberGameInfo', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.MemberGameInfo;

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
                        res.render('memberGameInfo/list', {
                            title: 'MemberGameInfo',
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

    expressApp.get('/memberGameInfo/create', 'memberGameInfo.create', expressApp.restrict, function (req, res) {

        res.render('memberGameInfo/create', {
            title: 'MemberGameInfos Create'
        });
    });

    expressApp.get('/memberGameInfo/delete/:id', 'memberGameInfo.delete', expressApp.restrict, function(req, res, next) {
        var memberID = req.params.id;
        expressApp.models.MemberGameInfo.findOne({
            where: {
                MemberID: memberID
            }
        })
        .then(function(result){
            res.render('memberGameInfo/delete', {
                title: 'MemberGameInfo Delete',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.delete("/memberGameInfo/delete/", 'memberGameInfo.destroy', expressApp.restrict, function(req,res, next){
        var memberID = req.body.id;
        expressApp.models.MemberGameInfo.destroy({
            where: {
                MemberID: memberID
            }
        })
            .then(function(result){
                console.log(result);
                res.redirect('/memberGameInfo');
            })
            .catch(function(err) {
                next(err);
            });
    });

    expressApp.get('/memberGameInfo/:id', 'memberGameInfo.show', expressApp.restrict, function(req, res, next) {
        var memberID = req.params.id;
        expressApp.models.MemberGameInfo.findOne({
            where: {
                MemberID: memberID
            }
        })
        .then(function(result){
            res.render('memberGameInfo/edit', {
                title: 'MemberGameInfo',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/memberGameInfo/', 'memberGameInfo.store', expressApp.restrict, function(req, res, next) {
        var memberGameInfo = req.body.memberGameInfo;
        expressApp.models.MemberGameInfo.create({
            MemberID : memberGameInfo.MemberID

            , Level : memberGameInfo.Level
            , Exps : memberGameInfo.Exps
            , Points : memberGameInfo.Points

            , UserSTAT1 : memberGameInfo.UserSTAT1
            , UserSTAT2 : memberGameInfo.UserSTAT2
            , UserSTAT3 : memberGameInfo.UserSTAT3
            , UserSTAT4 : memberGameInfo.UserSTAT4
            , UserSTAT5 : memberGameInfo.UserSTAT5
            , UserSTAT6 : memberGameInfo.UserSTAT6
            , UserSTAT7 : memberGameInfo.UserSTAT7
            , UserSTAT8 : memberGameInfo.UserSTAT8
            , UserSTAT9 : memberGameInfo.UserSTAT9
            , UserSTAT10 : memberGameInfo.UserSTAT10

            , sCol1 : memberGameInfo.sCol1 || ''
            , sCol2 : memberGameInfo.sCol2 || ''
            , sCol3 : memberGameInfo.sCol3 || ''
            , sCol4 : memberGameInfo.sCol4 || ''
            , sCol5 : memberGameInfo.sCol5 || ''
            , sCol6 : memberGameInfo.sCol6 || ''
            , sCol7 : memberGameInfo.sCol7 || ''
            , sCol8 : memberGameInfo.sCol8 || ''
            , sCol9 : memberGameInfo.sCol9 || ''
            , sCol10 : memberGameInfo.sCol10 || ''

            , HideYN : memberGameInfo.HideYN
            , DeleteYN : memberGameInfo.DeleteYN
            , DataFromRegion : memberGameInfo.DataFromRegion || ''
            , DataFromRegionDT : memberGameInfo.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'

        }).then(function() {
            res.redirect('/memberGameInfo');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/memberGameInfo/edit', 'memberGameInfo.update', expressApp.restrict, function(req, res, next) {
        var memberGameInfo = req.body.memberGameInfo;
        expressApp.models.MemberGameInfo.update({


            Level : memberGameInfo.Level
            , Exps : memberGameInfo.Exps
            , Points : memberGameInfo.Points

            , UserSTAT1 : memberGameInfo.UserSTAT1
            , UserSTAT2 : memberGameInfo.UserSTAT2
            , UserSTAT3 : memberGameInfo.UserSTAT3
            , UserSTAT4 : memberGameInfo.UserSTAT4
            , UserSTAT5 : memberGameInfo.UserSTAT5
            , UserSTAT6 : memberGameInfo.UserSTAT6
            , UserSTAT7 : memberGameInfo.UserSTAT7
            , UserSTAT8 : memberGameInfo.UserSTAT8
            , UserSTAT9 : memberGameInfo.UserSTAT9
            , UserSTAT10 : memberGameInfo.UserSTAT10

            , sCol1 : memberGameInfo.sCol1
            , sCol2 : memberGameInfo.sCol2
            , sCol3 : memberGameInfo.sCol3
            , sCol4 : memberGameInfo.sCol4
            , sCol5 : memberGameInfo.sCol5
            , sCol6 : memberGameInfo.sCol6
            , sCol7 : memberGameInfo.sCol7
            , sCol8 : memberGameInfo.sCol8
            , sCol9 : memberGameInfo.sCol9
            , sCol10 : memberGameInfo.sCol10

            , HideYN : memberGameInfo.HideYN
            , DeleteYN : memberGameInfo.DeleteYN

        }, {
            where : {MemberID : memberGameInfo.MemberID}
        }).then(function() {
            res.redirect('/memberGameInfo');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
