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

    expressApp.get('/memberAccountBlockLog/:id', 'memberAccountBlockLog.show', expressApp.restrict, function(req, res) {
        var memberAccountBlockId = req.params.id;
        expressApp.models.MemberAccountBlockLog.findOne({
            where: {
                MemberAccountBlockLogID: memberAccountBlockLogId
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

    expressApp.get('/memberAccountBlockLog/create', 'memberAccountBlockLog.create', expressApp.restrict, function (req, res) {

        res.render('memberAccountBlockLog/create', {
            title: 'MemberAccountBlockLogs Create'
        });
    });

    expressApp.post('/memberAccountBlockLog/', 'memberAccountBlockLog.store', expressApp.restrict, function(req, res) {
        res.redirect('/memberAccountBlockLog');
    });

    expressApp.post('/memberAccountBlockLog/edit', 'memberAccountBlockLog.update', expressApp.restrict, function(req, res) {
        res.redirect('/memberAccountBlockLog');
    });
}

module.exports = route;
