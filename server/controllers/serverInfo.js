function route(expressApp){

    expressApp.get('/serverInfo', 'serverInfo', expressApp.restrict, function (req, res) {
        expressApp.models.ServerInfo.findAll().then(function(results) {
            res.render('serverInfo/list', {
                title: 'ServerInfo',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/serverInfo/create', 'serverInfo.create', expressApp.restrict, function (req, res) {

        res.render('serverInfo/create', {
            title: 'ServerInfo Create'
        });
    });

    expressApp.get('/serverInfo/:id', 'serverInfo.show', expressApp.restrict, function(req, res) {
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

            , sCol1 : info.sCol1
            , sCol2 : info.sCol2
            , sCol3 : info.sCol3
            , sCol4 : info.sCol4
            , sCol5 : info.sCol5

            , DataFromRegion : info.DataFromRegion || ''
            , DataFromRegionDT : info.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'
        }).then(function() {
            res.redirect('/serverInfo');
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/serverInfo/edit', 'serverInfo.update', expressApp.restrict, function(req, res) {
        res.redirect('/serverInfo');
    });
}

module.exports = route;
