function route(expressApp){

    expressApp.get('/gameEvent', 'gameEvent', expressApp.restrict, function (req, res) {
        expressApp.models.GameEvents.findAll().then(function(results) {
            res.render('gameEvent/list', {
                title: 'GameEvents',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/gameEvent/:id', 'gameEvent.show', expressApp.restrict, function(req, res) {
        var gameEventId = req.params.id;
        expressApp.models.GameEvents.findOne({
            where: {
                GameEventID: gameEventId
            }
        })
        .then(function(result){
            res.render('gameEvent/edit', {
                title: 'GameEvents',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/gameEvent/create', 'gameEvent.create', expressApp.restrict, function (req, res) {

        res.render('gameEvent/create', {
            title: 'GameEvents Create'
        });
    });

    expressApp.post('/gameEvent/', 'gameEvent.store', expressApp.restrict, function(req, res) {
        res.redirect('/gameEvent');
    });

    expressApp.post('/gameEvent/edit', 'gameEvent.update', expressApp.restrict, function(req, res) {
        res.redirect('/gameEvent');
    });
}

module.exports = route;
