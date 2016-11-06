var Sequelize = require('sequelize');

function route(expressApp){

    expressApp.get('/statsData', 'statsData', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.StatsData;

        var keyword = req.query.keyword || '';
        keyword = keyword.trim();

        if(keyword != ''){
            filter = Sequelize.or(
                { StatID: { $like : '%'+keyword+'%'} },
                { CategoryName: { $like : '%'+keyword+'%'} },
                { CountNum: keyword },
                { Fields: keyword }
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
                        res.render('statsData/list', {
                            title: 'StatsData',
                            listObjs: results,
                            page:currentPage,
                            count:count,
                            keyword:keyword
                        });
                    }).catch(function (err) {
                    next(err);
                });

            }).catch(function(err){
            next(err);
        });
    });

    expressApp.get('/statsData/create', 'statsData.create', expressApp.restrict, function (req, res) {

        res.render('statsData/create', {
            title: 'StatsData Create'
        });
    });

    expressApp.get('/statsData/delete/:id', 'statsData.delete', expressApp.restrict, function(req, res, next) {
        var StatID = req.params.id;
        expressApp.models.StatsData.findOne({
            where: {
                StatID: StatID
            }
        })
        .then(function(result){
            res.render('statsData/delete', {
                title: 'StatsData Delete',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post("/statsData/delete/", 'statsData.destroy', expressApp.restrict, function(req,res, next){
        var StatID = req.body.id;
        expressApp.models.StatsData.destroy({
            where: {
                StatID: StatID
            }
        })
            .then(function(result){
                console.log(result);
                res.redirect('/statsData');
            })
            .catch(function(err) {
                next(err);
            });
    });


    expressApp.get('/statsData/:id', 'statsData.show', expressApp.restrict, function(req, res, next) {
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

    expressApp.post('/statsData/edit', 'statsData.update', expressApp.restrict, function(req, res, next) {
        var statData = req.body.statData;
        expressApp.models.StatsData.update({
            CategoryName : statData.CategoryName
            , CountNum : statData.CountNum

            , Fields : statData.Fields
        }, {
            where : {StatID : statData.StatID}
        }).then(function() {
            res.redirect('/statsData');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
