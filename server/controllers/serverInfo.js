function route(expressApp){

    expressApp.get('/serverInfo', 'serverInfo', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.ServerInfo;

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
                        res.render('serverInfo/list', {
                            title: 'ServerInfo',
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

    expressApp.get('/serverInfo/create', 'serverInfo.create', expressApp.restrict, function (req, res) {

        res.render('serverInfo/create', {
            title: 'ServerInfo Create'
        });
    });

    expressApp.get('/serverInfo/delete/:id', 'serverInfo.delete', expressApp.restrict, function(req, res, next) {
        var InfoID = req.params.id;
        expressApp.models.ServerInfo.findOne({
            where: {
                InfoID: InfoID
            }
        })
        .then(function(result){
            res.render('serverInfo/delete', {
                title: 'ServerInfo Delete',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.delete("/serverInfo/delete/", 'serverInfo.destroy', expressApp.restrict, function(req,res, next){
        var InfoID = req.body.id;
        expressApp.models.ServerInfo.destroy({
            where: {
                InfoID: InfoID
            }
        })
            .then(function(result){
                console.log(result);
                res.redirect('/serverInfo');
            })
            .catch(function(err) {
                next(err);
            });
    });

    expressApp.get('/serverInfo/:id', 'serverInfo.show', expressApp.restrict, function(req, res, next) {
        var InfoID = req.params.id;
        expressApp.models.ServerInfo.findOne({
            where: {
                InfoID: InfoID
            }
        })
        .then(function(result){
            res.render('serverInfo/edit', {
                title: 'ServerInfo',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/serverInfo/', 'serverInfo.store', expressApp.restrict, function(req, res, next) {
        var info = req.body.serverInfo;
        expressApp.models.ServerInfo.create({
            InfoID : info.InfoID

            , FEServerLists : info.FEServerLists
            , SocketServerLists : info.SocketServerLists

            , Version : info.Version

            , ResourceLink : info.ResourceLink
            , EULAText : info.EULAText

            , sCol1 : info.sCol1 || ''
            , sCol2 : info.sCol2 || ''
            , sCol3 : info.sCol3 || ''
            , sCol4 : info.sCol4 || ''
            , sCol5 : info.sCol5 || ''

            , DataFromRegion : info.DataFromRegion || ''
            , DataFromRegionDT : info.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'
        }).then(function() {
            res.redirect('/serverInfo');
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/serverInfo/edit', 'serverInfo.update', expressApp.restrict, function(req, res, next) {
        var info = req.body.serverInfo;
        expressApp.models.ServerInfo.update({
            FEServerLists : info.FEServerLists
            , SocketServerLists : info.SocketServerLists

            , Version : info.Version

            , ResourceLink : info.ResourceLink
            , EULAText : info.EULAText

            , sCol1 : info.sCol1
            , sCol2 : info.sCol2
            , sCol3 : info.sCol3
            , sCol4 : info.sCol4
            , sCol5 : info.sCol5

        }, {
            where : {InfoID : info.InfoID}
        }).then(function() {
            res.redirect('/serverInfo');
        }).catch(function(err) {
            next(err);
        });

    });
}

module.exports = route;
