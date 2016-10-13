function route(expressApp){

    expressApp.get('/memberGameInfo', 'memberGameInfo', expressApp.restrict, function (req, res) {
        expressApp.models.MemberGameInfo.findAll().then(function(results) {
            res.render('memberGameInfo/list', {
                title: 'MemberGameInfo',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/memberGameInfo/:id', 'memberGameInfo.show', expressApp.restrict, function(req, res) {
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

    expressApp.get('/memberGameInfo/create', 'memberGameInfo.create', expressApp.restrict, function (req, res) {

        res.render('memberGameInfo/create', {
            title: 'MemberGameInfos Create'
        });
    });

    expressApp.post('/memberGameInfo/', 'memberGameInfo.store', expressApp.restrict, function(req, res) {
        res.redirect('/memberGameInfo');
    });

    expressApp.post('/memberGameInfo/edit', 'memberGameInfo.update', expressApp.restrict, function(req, res) {
        res.redirect('/memberGameInfo');
    });
}

module.exports = route;
