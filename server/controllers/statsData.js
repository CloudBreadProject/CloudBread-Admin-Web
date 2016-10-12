function route(expressApp){

    expressApp.get('/statsData', 'statsData', expressApp.restrict, function (req, res) {
        expressApp.models.StatsData.findAll().then(function(results) {
            res.render('statsData/list', {
                title: 'StatsData',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/statsData/:id', 'statsData.show', expressApp.restrict, function(req, res) {
        var memberId = req.params.id;
        expressApp.models.StatsData.findOne({
            where: {
                MemberID: memberId
            }
        })
        .then(function(result){
            res.render('statsData/edit', {
                title: 'StatsData',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/statsData/create', 'statsData.create', expressApp.restrict, function (req, res) {

        res.render('statsData/create', {
            title: 'StatsData Create'
        });
    });

    expressApp.post('/statsData/', 'statsData.store', expressApp.restrict, function(req, res) {
        res.redirect('/statsData');
    });

    expressApp.post('/statsData/edit', 'statsData.update', expressApp.restrict, function(req, res) {
        res.redirect('/statsData');
    });
}

module.exports = route;
