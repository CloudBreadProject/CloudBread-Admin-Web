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

    expressApp.get('/statsData/create', 'statsData.create', expressApp.restrict, function (req, res) {

        res.render('statsData/create', {
            title: 'StatsData Create'
        });
    });

    expressApp.get('/statsData/:id', 'statsData.show', expressApp.restrict, function(req, res) {
        var StatID = req.params.id;
        expressApp.models.StatsData.findOne({
            where: {
                StatID: StatID
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

    expressApp.post('/statsData/', 'statsData.store', expressApp.restrict, function(req, res, next) {
        var statData = req.body.statData;
        expressApp.models.StatsData.create({
            StatID : statData.StatID

            , CategoryName : statData.CategoryName
            , CountNum : statData.CountNum

            , Fields : statData.Fields
        }).then(function() {
            res.redirect('/statsData');
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/statsData/edit', 'statsData.update', expressApp.restrict, function(req, res) {
        res.redirect('/statsData');
    });
}

module.exports = route;
