function route(expressApp){

    expressApp.get('/statData', 'statData', expressApp.restrict, function (req, res) {
        expressApp.models.StatData.findAll().then(function(results) {
            res.render('statData/list', {
                title: 'StatData',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/statData/:id', 'statData.show', expressApp.restrict, function(req, res) {
        var memberId = req.params.id;
        expressApp.models.StatData.findOne({
            where: {
                MemberID: memberId
            }
        })
        .then(function(result){
            res.render('statData/edit', {
                title: 'StatData',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/statData/create', 'statData.create', expressApp.restrict, function (req, res) {

        res.render('statData/create', {
            title: 'StatData Create'
        });
    });

    expressApp.post('/statData/', 'statData.store', expressApp.restrict, function(req, res) {
        res.redirect('/statData');
    });

    expressApp.post('/statData/edit', 'statData.update', expressApp.restrict, function(req, res) {
        res.redirect('/statData');
    });
}

module.exports = route;
