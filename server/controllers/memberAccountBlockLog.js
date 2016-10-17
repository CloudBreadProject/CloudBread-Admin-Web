function route(expressApp){

    expressApp.get('/memberAccountBlockLog', 'memberAccountBlockLog', expressApp.restrict, function (req, res) {
        expressApp.models.MemberAccountBlockLog.findAll().then(function(results) {
            res.render('memberAccountBlockLog/list', {
                title: 'MemberAccountBlockLog',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/memberAccountBlockLog/create', 'memberAccountBlockLog.create', expressApp.restrict, function (req, res) {

        res.render('memberAccountBlockLog/create', {
            title: 'MemberAccountBlockLogs Create'
        });
    });

    expressApp.get('/memberAccountBlockLog/:id', 'memberAccountBlockLog.show', expressApp.restrict, function(req, res) {
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
