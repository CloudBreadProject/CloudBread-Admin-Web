var Sequelize = require('sequelize');

function route(expressApp){

    expressApp.get('/gameEvent', 'gameEvent', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.GameEvents;

        var keyword = req.query.keyword || '';
        keyword = keyword.trim();

        if(keyword != ''){
            filter = Sequelize.or(
                { GameEventID: { $like : '%'+keyword+'%'} },
                { EventCategory1: { $like : '%'+keyword+'%'} },
                { EventCategory2: { $like : '%'+keyword+'%'} },
                { EventCategory3: { $like : '%'+keyword+'%'} },
                { EventCategory3: { $like : '%'+keyword+'%'} },
                { Title: { $like : '%'+keyword+'%'} },
                { Content: { $like : '%'+keyword+'%'} },
                { TargetGroup: { $like : '%'+keyword+'%'} }

            )
        }

        Model.findAll({
                where : filter
            })
            .then(function(filteredModel) {
                var count = filteredModel.length;

                Model.findAll({
                        where : filter,
                        limit : perPage,
                        offset : (currentPage <= 1) ? 0 : perPage*(currentPage-1)
                    })
                    .then(function (results) {
                        res.render('gameEvent/list', {
                            title: 'GameEvents',
                            listObjs: results,
                            page:currentPage,
                            count:count
                        });
                    }).catch(function (err) {
                    next(err);
                });

            }).catch(function(err){
            next(err);
        });
    });

    expressApp.get('/gameEvent/create', 'gameEvent.create', expressApp.restrict, function (req, res) {
        res.render('gameEvent/create', {
            title: 'GameEvents Create'
        });
    });

    expressApp.get('/gameEvent/delete/:id', 'gameEvent.delete', expressApp.restrict, function(req, res, next) {
        var gameEventId = req.params.id;
        expressApp.models.GameEvents.findOne({
            where: {
                GameEventID: gameEventId
            }
        })
        .then(function(result){
            res.render('gameEvent/delete', {
                title: 'GameEvents Delete',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post("/gameEvent/delete/", 'gameEvent.destroy', expressApp.restrict, function(req,res, next){
        var gameEventId = req.body.id;
        expressApp.models.GameEvents.destroy({
            where: {
                GameEventID: gameEventId
            }
        })
            .then(function(result){
                console.log(result);
                res.redirect('/gameEvent');
            })
            .catch(function(err) {
                next(err);
            });
    });

    expressApp.get('/gameEvent/:id', 'gameEvent.show', expressApp.restrict, function(req, res, next) {
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

    expressApp.post('/gameEvent/', 'gameEvent.store', expressApp.restrict, function(req, res, next) {
        var gameEvent = req.body.gameEvent;
        expressApp.models.GameEvents.create({
            GameEventID  : gameEvent.GameEventID
            , EventCategory1 : gameEvent.EventCategory1
            , EventCategory2 : gameEvent.EventCategory2
            , EventCategory3 : gameEvent.EventCategory3
            , ItemListID : gameEvent.ItemListID

            , ItemCount : gameEvent.ItemCount
            , ItemStatus : gameEvent.ItemStatus
            , TargetGroup : gameEvent.TargetGroup
            , TargetOS : gameEvent.TargetOS
            , TargetDevice : gameEvent.TargetDevice
            , EventImageLink : gameEvent.EventImageLink
            , Title : gameEvent.Title
            , Content : gameEvent.Content

            , sCol1 : gameEvent.sCol1 || ''
            , sCol2 : gameEvent.sCol2 || ''
            , sCol3 : gameEvent.sCol3 || ''
            , sCol4 : gameEvent.sCol4 || ''
            , sCol5 : gameEvent.sCol5 || ''
            , sCol6 : gameEvent.sCol6 || ''
            , sCol7 : gameEvent.sCol7 || ''
            , sCol8 : gameEvent.sCol8 || ''
            , sCol9 : gameEvent.sCol9 || ''
            , sCol10 : gameEvent.sCol10 || ''

            , EventDurationFrom : gameEvent.EventDurationFrom
            , EventDurationTo  : gameEvent.EventDurationTo
            , OrderNumber   : gameEvent.OrderNumber
            , CreateAdminID    : gameEvent.CreateAdminID || ''

            , HideYN : gameEvent.HideYN
            , DeleteYN : gameEvent.DeleteYN
            , DataFromRegion : gameEvent.DataFromRegion || ''
            , DataFromRegionDT : gameEvent.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'

        }).then(function() {
            res.redirect('/gameEvent');
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/gameEvent/edit', 'gameEvent.update', expressApp.restrict, function(req, res, next) {
        var gameEvent = req.body.gameEvent;
        expressApp.models.GameEvents.update({

            EventCategory1 : gameEvent.EventCategory1
            , EventCategory2 : gameEvent.EventCategory2
            , EventCategory3 : gameEvent.EventCategory3
            , ItemListID : gameEvent.ItemListID

            , ItemCount : gameEvent.ItemCount
            , ItemStatus : gameEvent.ItemStatus
            , TargetGroup : gameEvent.TargetGroup
            , TargetOS : gameEvent.TargetOS
            , TargetDevice : gameEvent.TargetDevice
            , EventImageLink : gameEvent.EventImageLink
            , Title : gameEvent.Title
            , Content : gameEvent.Content

            , sCol1 : gameEvent.sCol1
            , sCol2 : gameEvent.sCol2
            , sCol3 : gameEvent.sCol3
            , sCol4 : gameEvent.sCol4
            , sCol5 : gameEvent.sCol5
            , sCol6 : gameEvent.sCol6
            , sCol7 : gameEvent.sCol7
            , sCol8 : gameEvent.sCol8
            , sCol9 : gameEvent.sCol9
            , sCol10 : gameEvent.sCol10

            , EventDurationFrom : gameEvent.EventDurationFrom
            , EventDurationTo  : gameEvent.EventDurationTo
            , OrderNumber   : gameEvent.OrderNumber

            , HideYN : gameEvent.HideYN
            , DeleteYN : gameEvent.DeleteYN

        }, {
            where: {GameEventID  : gameEvent.GameEventID}
        }).then(function() {
            res.redirect('/gameEvent');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
