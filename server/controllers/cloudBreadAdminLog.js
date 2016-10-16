function route(expressApp){

    expressApp.get('/cloudBreadAdminLog', 'cloudBreadAdminLog', expressApp.restrict, function (req, res) {
        expressApp.models.CloudBreadAdminLog.findAll().then(function(results) {
            res.render('cloudBreadAdminLog/list', {
                title: 'CloudBreadAdminLog',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/cloudBreadAdminLog/:id', 'cloudBreadAdminLog.show', expressApp.restrict, function(req, res) {
        var Id = req.params.id;
        expressApp.models.CloudBreadAdminLog.findOne({
                where: {
                    ID: Id
                }
            })
            .then(function(result){
                res.render('cloudBreadAdminLog/edit', {
                    title: 'CloudBreadAdminLog',
                    obj : result
                });
            }).catch(function(err) {
            next(err);
        });

    });

}

module.exports = route;
