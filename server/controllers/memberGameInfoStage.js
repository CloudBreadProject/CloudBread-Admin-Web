function route(expressApp){

    expressApp.get('/memberGameInfoStage', 'memberGameInfoStage', expressApp.restrict, function (req, res) {
        expressApp.models.MemberGameInfoStage.findAll().then(function(results) {
            res.render('memberGameInfoStage/list', {
                title: 'MemberGameInfoStage',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/memberGameInfoStage/:id', 'memberGameInfoStage.show', expressApp.restrict, function(req, res) {
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

    expressApp.get('/memberGameInfoStage/create', 'memberGameInfoStage.create', expressApp.restrict, function (req, res) {

        res.render('memberGameInfoStage/create', {
            title: 'MemberGameInfoStages Create'
        });
    });

    expressApp.post('/memberGameInfoStage/', 'memberGameInfoStage.store', expressApp.restrict, function(req, res) {
        res.redirect('/memberGameInfoStage');
    });

    expressApp.post('/memberGameInfoStage/edit', 'memberGameInfoStage.update', expressApp.restrict, function(req, res) {
        res.redirect('/memberGameInfoStage');
    });
}

module.exports = route;
