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

    expressApp.get('/serverInfo/create', 'serverInfo.create', expressApp.restrict, function (req, res) {

        res.render('serverInfo/create', {
            title: 'ServerInfo Create'
        });
    });

    expressApp.post('/serverInfo/', 'serverInfo.store', expressApp.restrict, function(req, res) {
        res.redirect('/serverInfo');
    });

    expressApp.post('/serverInfo/edit', 'serverInfo.update', expressApp.restrict, function(req, res) {
        res.redirect('/serverInfo');
    });
}

module.exports = route;
