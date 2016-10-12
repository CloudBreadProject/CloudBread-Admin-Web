function route(expressApp){

    expressApp.get('/appAdminLog', 'appAdminLog', expressApp.restrict, function (req, res) {
        expressApp.models.AppAdminLog.findAll().then(function(results) {
            res.render('appAdminLog/list', {
                title: 'AppAdminLog',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/appAdminLog/:id', 'appAdminLog.show', expressApp.restrict, function(req, res) {
        var memberId = req.params.id;
        expressApp.models.AppAdminLog.findOne({
            where: {
                MemberID: memberId
            }
        })
        .then(function(result){
            res.render('appAdminLog/edit', {
                title: 'AppAdminLog',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/appAdminLog/create', 'appAdminLog.create', expressApp.restrict, function (req, res) {

        res.render('appAdminLog/create', {
            title: 'AppAdminLog Create'
        });
    });

    expressApp.post('/appAdminLog/', 'appAdminLog.store', expressApp.restrict, function(req, res) {
        res.redirect('/appAdminLog');
    });

    expressApp.post('/appAdminLog/edit', 'appAdminLog.update', expressApp.restrict, function(req, res) {
        res.redirect('/appAdminLog');
    });
}

module.exports = route;
