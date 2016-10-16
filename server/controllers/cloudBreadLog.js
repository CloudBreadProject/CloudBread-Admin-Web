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
}

module.exports = route;
