function route(expressApp){

    expressApp.get('/appSystemLog', 'appSystemLog', expressApp.restrict, function (req, res) {
        expressApp.models.AppSystemLog.findAll().then(function(results) {
            res.render('appSystemLog/list', {
                title: 'AppSystemLog',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/appSystemLog/:id', 'appSystemLog.show', expressApp.restrict, function(req, res) {
        var memberId = req.params.id;
        expressApp.models.AppSystemLog.findOne({
            where: {
                MemberID: memberId
            }
        })
        .then(function(result){
            res.render('appSystemLog/edit', {
                title: 'AppSystemLog',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/appSystemLog/create', 'appSystemLog.create', expressApp.restrict, function (req, res) {

        res.render('appSystemLog/create', {
            title: 'AppSystemLog Create'
        });
    });

    expressApp.post('/appSystemLog/', 'appSystemLog.store', expressApp.restrict, function(req, res) {
        res.redirect('/appSystemLog');
    });

    expressApp.post('/appSystemLog/edit', 'appSystemLog.update', expressApp.restrict, function(req, res) {
        res.redirect('/appSystemLog');
    });
}

module.exports = route;
