var Sequelize = require('sequelize');

function route(expressApp){

    expressApp.get('/memberAccountBlockLog', 'memberAccountBlockLog', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.MemberAccountBlockLog;

        var keyword = req.query.keyword || '';
        keyword = keyword.trim();

        if(keyword != ''){
            filter = Sequelize.or(
                { MemberAccountBlockLogID: { $like : '%'+keyword+'%'} },
                { MemberId: { $like : '%'+keyword+'%'} },
                { MemberAccountBlockReasonCategory1: { $like : '%'+keyword+'%'} },
                { MemberAccountBlockReasonCategory2: { $like : '%'+keyword+'%'} },
                { MemberAccountBlockReasonCategory3: { $like : '%'+keyword+'%'} }
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
                        res.render('memberAccountBlockLog/list', {
                            title: 'MemberAccountBlockLog',
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

    expressApp.get('/memberAccountBlockLog/create', 'memberAccountBlockLog.create', expressApp.restrict, function (req, res) {

        res.render('memberAccountBlockLog/create', {
            title: 'MemberAccountBlockLogs Create'
        });
    });

    expressApp.get('/memberAccountBlockLog/delete/:id', 'memberAccountBlockLog.delete', expressApp.restrict, function(req, res, next) {
        var memberAccountBlockId = req.params.id;
        expressApp.models.MemberAccountBlockLog.findOne({
            where: {
                MemberAccountBlockID: memberAccountBlockId
            }
        })
        .then(function(result){
            res.render('memberAccountBlockLog/delete', {
                title: 'MemberAccountBlockLog Delete',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post("/memberAccountBlockLog/delete/", 'memberAccountBlockLog.destroy', expressApp.restrict, function(req,res, next){
        var memberAccountBlockId = req.body.id;
        expressApp.models.MemberAccountBlockLog.destroy({
            where: {
                MemberAccountBlockID: memberAccountBlockId
            }
        })
            .then(function(result){
                console.log(result);
                res.redirect('/memberAccountBlockLog');
            })
            .catch(function(err) {
                next(err);
            });
    });

    expressApp.get('/memberAccountBlockLog/:id', 'memberAccountBlockLog.show', expressApp.restrict, function(req, res, next) {
        var memberAccountBlockId = req.params.id;
        expressApp.models.MemberAccountBlockLog.findOne({
            where: {
                MemberAccountBlockID: memberAccountBlockId
            }
        })
        .then(function(result){
            res.render('memberAccountBlockLog/edit', {
                title: 'MemberAccountBlockLog',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/memberAccountBlockLog/', 'memberAccountBlockLog.store', expressApp.restrict, function(req, res, next) {
        var blockLog = req.body.blockLog;
        expressApp.models.MemberAccountBlockLog.create({
            MemberAccountBlockID  : blockLog.MemberAccountBlockID
            , MemberID : blockLog.MemberID
            , MemberAccountBlockReasonCategory1 : blockLog.MemberAccountBlockReasonCategory1
            , MemberAccountBlockReasonCategory2 : blockLog.MemberAccountBlockReasonCategory2
            , MemberAccountBlockReasonCategory3 : blockLog.MemberAccountBlockReasonCategory3
            , MemberAccountBlockReason : blockLog.MemberAccountBlockReason
            , MemberAccountBlockProcess : blockLog.MemberAccountBlockProcess

            , sCol1 : blockLog.sCol1 || ''
            , sCol2 : blockLog.sCol2 || ''
            , sCol3 : blockLog.sCol3 || ''
            , sCol4 : blockLog.sCol4 || ''
            , sCol5 : blockLog.sCol5 || ''
            , sCol6 : blockLog.sCol6 || ''
            , sCol7 : blockLog.sCol7 || ''
            , sCol8 : blockLog.sCol8 || ''
            , sCol9 : blockLog.sCol9 || ''
            , sCol10 : blockLog.sCol10 || ''

            , CreateAdminID    : blockLog.CreateAdminID || ''
            , HideYN : blockLog.HideYN
            , DeleteYN : blockLog.DeleteYN
            , DataFromRegion : blockLog.DataFromRegion || ''
            , DataFromRegionDT : blockLog.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'

        }).then(function() {
            res.redirect('/memberAccountBlockLog');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/memberAccountBlockLog/edit', 'memberAccountBlockLog.update', expressApp.restrict, function(req, res, next) {
        var blockLog = req.body.blockLog;
        expressApp.models.MemberAccountBlockLog.update({

            MemberID : blockLog.MemberID
            , MemberAccountBlockReasonCategory1 : blockLog.MemberAccountBlockReasonCategory1
            , MemberAccountBlockReasonCategory2 : blockLog.MemberAccountBlockReasonCategory2
            , MemberAccountBlockReasonCategory3 : blockLog.MemberAccountBlockReasonCategory3
            , MemberAccountBlockReason : blockLog.MemberAccountBlockReason
            , MemberAccountBlockProcess : blockLog.MemberAccountBlockProcess

            , sCol1 : blockLog.sCol1
            , sCol2 : blockLog.sCol2
            , sCol3 : blockLog.sCol3
            , sCol4 : blockLog.sCol4
            , sCol5 : blockLog.sCol5
            , sCol6 : blockLog.sCol6
            , sCol7 : blockLog.sCol7
            , sCol8 : blockLog.sCol8
            , sCol9 : blockLog.sCol9
            , sCol10 : blockLog.sCol10

            , HideYN : blockLog.HideYN
            , DeleteYN : blockLog.DeleteYN

        }, {
            where : {MemberAccountBlockID  : blockLog.MemberAccountBlockID}
        }).then(function() {
            res.redirect('/memberAccountBlockLog');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
