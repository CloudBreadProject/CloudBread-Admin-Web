function route(expressApp){

    expressApp.get('/cloudBreadErrorLog', 'cloudBreadErrorLog', expressApp.restrict, function (req, res) {
        expressApp.models.CloudBreadErrorLog.findAll().then(function(results) {
            res.render('cloudBreadErrorLog/list', {
                title: 'CloudBreadErrorLog',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/cloudBreadErrorLog/:id', 'cloudBreadErrorLog.show', expressApp.restrict, function(req, res) {
        var Id = req.params.id;
        expressApp.models.CloudBreadErrorLog.findOne({
                where: {
                    ID: Id
                }
            })
            .then(function(result){
                res.render('cloudBreadErrorLog/edit', {
                    title: 'CloudBreadErrorLog',
                    obj : result
                });
            }).catch(function(err) {
            next(err);
        });

    });

}

module.exports = route;
