function route(expressApp){

    expressApp.get('/cloudBreadLog', 'cloudBreadLog', expressApp.restrict, function (req, res) {
        expressApp.models.CloudBreadLog.findAll().then(function(results) {
            res.render('cloudBreadLog/list', {
                title: 'CloudBreadLog',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/cloudBreadLog/:id', 'cloudBreadLog.show', expressApp.restrict, function(req, res) {
        var Id = req.params.id;
        expressApp.models.CloudBreadLog.findOne({
            where: {
                ID: Id
            }
        })
        .then(function(result){
            res.render('cloudBreadLog/edit', {
                title: 'CloudBreadLog',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/cloudBreadLog/create', 'cloudBreadLog.create', expressApp.restrict, function (req, res) {

        res.render('cloudBreadLog/create', {
            title: 'CloudBreadLog Create'
        });
    });

    expressApp.post('/cloudBreadLog/', 'cloudBreadLog.store', expressApp.restrict, function(req, res) {
        res.redirect('/cloudBreadLog');
    });

    expressApp.post('/cloudBreadLog/edit', 'cloudBreadLog.update', expressApp.restrict, function(req, res) {
        res.redirect('/cloudBreadLog');
    });
}

module.exports = route;
