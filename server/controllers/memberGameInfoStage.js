var Sequelize = require('sequelize');

function route(expressApp){

    expressApp.get('/memberGameInfoStage', 'memberGameInfoStage', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.MemberGameInfoStage;

        var keyword = req.query.keyword || '';
        keyword = keyword.trim();

        if(keyword != ''){
            filter = Sequelize.or(
                { MemberGameInfoStageID: { $like : '%'+keyword+'%'} },
                { MemberID: { $like : '%'+keyword+'%'} },
                { StageName: { $like : '%'+keyword+'%'} },
                { StageStatus: { $like : '%'+keyword+'%'} },
                { Category1: { $like : '%'+keyword+'%'} },
                { Category2: { $like : '%'+keyword+'%'} },
                { Category3: { $like : '%'+keyword+'%'} }
            )
        }

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
                        res.render('memberGameInfoStage/list', {
                            title: 'MemberGameInfoStage',
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

    expressApp.get('/memberGameInfoStage/create', 'memberGameInfoStage.create', expressApp.restrict, function (req, res) {

        res.render('memberGameInfoStage/create', {
            title: 'MemberGameInfoStages Create'
        });
    });

    expressApp.get('/memberGameInfoStage/delete/:id', 'memberGameInfoStage.delete', expressApp.restrict, function(req, res, next) {
        var memberGameInfoStageId = req.params.id;
        expressApp.models.MemberGameInfoStage.findOne({
            where: {
                MemberGameInfoStageID: memberGameInfoStageId
            }
        })
        .then(function(result){
            res.render('memberGameInfoStage/delete', {
                title: 'MemberGameInfoStage Delete',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post("/memberGameInfoStage/delete/", 'memberGameInfoStage.destroy', expressApp.restrict, function(req,res, next){
        var memberGameInfoStageId = req.body.id;
        expressApp.models.MemberGameInfoStage.destroy({
            where: {
                MemberGameInfoStageID: memberGameInfoStageId
            }
        })
            .then(function(result){
                console.log(result);
                res.redirect('/memberGameInfoStage');
            })
            .catch(function(err) {
                next(err);
            });
    });


    expressApp.get('/memberGameInfoStage/:id', 'memberGameInfoStage.show', expressApp.restrict, function(req, res, next) {
        var memberGameInfoStageId = req.params.id;
        expressApp.models.MemberGameInfoStage.findOne({
            where: {
                MemberGameInfoStageID: memberGameInfoStageId
            }
        })
        .then(function(result){
            res.render('memberGameInfoStage/edit', {
                title: 'MemberGameInfoStage',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/memberGameInfoStage/', 'memberGameInfoStage.store', expressApp.restrict, function(req, res, next) {
        var memberGameInfoStage = req.body.memberGameInfoStage;
        expressApp.models.MemberGameInfoStage.create({
            MemberGameInfoStageID : memberGameInfoStage.MemberGameInfoStageID
            , MemberID : memberGameInfoStage.MemberID

            , StageName : memberGameInfoStage.StageName
            , StageStatus : memberGameInfoStage.StageStatus

            , Category1 : memberGameInfoStage.Category1
            , Category2 : memberGameInfoStage.Category2
            , Category3 : memberGameInfoStage.Category3

            , Mission1 : memberGameInfoStage.Mission1
            , Mission2 : memberGameInfoStage.Mission2
            , Mission3 : memberGameInfoStage.Mission3
            , Mission4 : memberGameInfoStage.Mission4
            , Mission5 : memberGameInfoStage.Mission5

            , StageStat1 : memberGameInfoStage.StageStat1
            , StageStat2 : memberGameInfoStage.StageStat2
            , StageStat3 : memberGameInfoStage.StageStat3
            , StageStat4 : memberGameInfoStage.StageStat4
            , StageStat5 : memberGameInfoStage.StageStat5

            , Points : memberGameInfoStage.Points

            , sCol1 : memberGameInfoStage.sCol1 || ''
            , sCol2 : memberGameInfoStage.sCol2 || ''
            , sCol3 : memberGameInfoStage.sCol3 || ''
            , sCol4 : memberGameInfoStage.sCol4 || ''
            , sCol5 : memberGameInfoStage.sCol5 || ''
            , sCol6 : memberGameInfoStage.sCol6 || ''
            , sCol7 : memberGameInfoStage.sCol7 || ''
            , sCol8 : memberGameInfoStage.sCol8 || ''
            , sCol9 : memberGameInfoStage.sCol9 || ''
            , sCol10 : memberGameInfoStage.sCol10 || ''

            , HideYN : memberGameInfoStage.HideYN
            , DeleteYN : memberGameInfoStage.DeleteYN
            , DataFromRegion : memberGameInfoStage.DataFromRegion || ''
            , DataFromRegionDT : memberGameInfoStage.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'

        }).then(function() {
            res.redirect('/memberGameInfoStage');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/memberGameInfoStage/edit', 'memberGameInfoStage.update', expressApp.restrict, function(req, res, next) {
        var memberGameInfoStage = req.body.memberGameInfoStage;
        expressApp.models.MemberGameInfoStage.update({
            MemberID : memberGameInfoStage.MemberID

            , StageName : memberGameInfoStage.StageName
            , StageStatus : memberGameInfoStage.StageStatus

            , Category1 : memberGameInfoStage.Category1
            , Category2 : memberGameInfoStage.Category2
            , Category3 : memberGameInfoStage.Category3

            , Mission1 : memberGameInfoStage.Mission1
            , Mission2 : memberGameInfoStage.Mission2
            , Mission3 : memberGameInfoStage.Mission3
            , Mission4 : memberGameInfoStage.Mission4
            , Mission5 : memberGameInfoStage.Mission5

            , StageStat1 : memberGameInfoStage.StageStat1
            , StageStat2 : memberGameInfoStage.StageStat2
            , StageStat3 : memberGameInfoStage.StageStat3
            , StageStat4 : memberGameInfoStage.StageStat4
            , StageStat5 : memberGameInfoStage.StageStat5

            , Points : memberGameInfoStage.Points

            , sCol1 : memberGameInfoStage.sCol1
            , sCol2 : memberGameInfoStage.sCol2
            , sCol3 : memberGameInfoStage.sCol3
            , sCol4 : memberGameInfoStage.sCol4
            , sCol5 : memberGameInfoStage.sCol5
            , sCol6 : memberGameInfoStage.sCol6
            , sCol7 : memberGameInfoStage.sCol7
            , sCol8 : memberGameInfoStage.sCol8
            , sCol9 : memberGameInfoStage.sCol9
            , sCol10 : memberGameInfoStage.sCol10

            , HideYN : memberGameInfoStage.HideYN
            , DeleteYN : memberGameInfoStage.DeleteYN

        }, {
            where : {MemberGameInfoStageID : memberGameInfoStage.MemberGameInfoStageID}
        }).then(function() {
            res.redirect('/memberGameInfoStage');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
