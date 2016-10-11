function route(expressApp){

    expressApp.get('/appUserLog', 'appUserLog', expressApp.restrict, function (req, res) {
        expressApp.models.AppUserLog.findAll().then(function(results) {
            res.render('appUserLog/list', {
                title: 'AppUserLog',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/appUserLog/:id', 'appUserLog.show', expressApp.restrict, function(req, res) {
        var memberId = req.params.id;
        expressApp.models.AppUserLog.findOne({
            where: {
                MemberID: memberId
            }
        })
        .then(function(result){
            res.render('appUserLog/edit', {
                title: 'AppUserLog',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/appUserLog/create', 'appUserLog.create', expressApp.restrict, function (req, res) {

        res.render('appUserLog/create', {
            title: 'AppUserLog Create'
        });
    });

    expressApp.post('/appUserLog/', 'appUserLog.store', expressApp.restrict, function(req, res) {
        res.redirect('/appUserLog');
    });

    expressApp.post('/appUserLog/edit', 'appUserLog.update', expressApp.restrict, function(req, res) {
        res.redirect('/appUserLog');
    });
}

module.exports = route;
