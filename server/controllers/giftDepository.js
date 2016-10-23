function route(expressApp){

    expressApp.get('/giftDepository', 'giftDepository', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.GiftDepository;

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
                        res.render('giftDepository/list', {
                            title: 'GiftDepository',
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

    expressApp.get('/giftDepository/create', 'giftDepository.create', expressApp.restrict, function (req, res) {

        res.render('giftDepository/create', {
            title: 'GiftDepository Create'
        });
    });

    expressApp.get('/giftDepository/:id', 'giftDepository.show', expressApp.restrict, function(req, res) {
        var giftDepositoryId = req.params.id;
        expressApp.models.GiftDepository.findOne({
            where: {
                GiftDepositoryID: giftDepositoryId
            }
        })
        .then(function(result){
            res.render('giftDepository/edit', {
                title: 'GiftDepository',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/giftDepository/', 'giftDepository.store', expressApp.restrict, function(req, res, next) {
        var giftDepository = req.body.giftDepository;
        expressApp.models.GiftDepository.create({
            GiftDepositoryID  : giftDepository.GiftDepositoryID
            , ItemListID : giftDepository.ItemListID
            , ItemCount : giftDepository.ItemCount
            , FromMemberID : giftDepository.FromMemberID
            , ToMemberID : giftDepository.ToMemberID

            , sCol1 : giftDepository.sCol1 || ''
            , sCol2 : giftDepository.sCol2 || ''
            , sCol3 : giftDepository.sCol3 || ''
            , sCol4 : giftDepository.sCol4 || ''
            , sCol5 : giftDepository.sCol5 || ''
            , sCol6 : giftDepository.sCol6 || ''
            , sCol7 : giftDepository.sCol7 || ''
            , sCol8 : giftDepository.sCol8 || ''
            , sCol9 : giftDepository.sCol9 || ''
            , sCol10 : giftDepository.sCol10 || ''

            , SentMemberYN : giftDepository.SentMemberYN
            , HideYN : giftDepository.HideYN
            , DeleteYN : giftDepository.DeleteYN
            , DataFromRegion : giftDepository.DataFromRegion || ''
            , DataFromRegionDT : giftDepository.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'

        }).then(function() {
            res.redirect('/giftDepository');
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/giftDepository/edit', 'giftDepository.update', expressApp.restrict, function(req, res, next) {
        var giftDepository = req.body.giftDepository;
        expressApp.models.GiftDepository.update({
            ItemListID : giftDepository.ItemListID
            , ItemCount : giftDepository.ItemCount
            , FromMemberID : giftDepository.FromMemberID
            , ToMemberID : giftDepository.ToMemberID

            , sCol1 : giftDepository.sCol1
            , sCol2 : giftDepository.sCol2
            , sCol3 : giftDepository.sCol3
            , sCol4 : giftDepository.sCol4
            , sCol5 : giftDepository.sCol5
            , sCol6 : giftDepository.sCol6
            , sCol7 : giftDepository.sCol7
            , sCol8 : giftDepository.sCol8
            , sCol9 : giftDepository.sCol9
            , sCol10 : giftDepository.sCol10

            , SentMemberYN : giftDepository.SentMemberYN
            , HideYN : giftDepository.HideYN
            , DeleteYN : giftDepository.DeleteYN

        }, {
            where : {GiftDepositoryID  : giftDepository.GiftDepositoryID}
        }).then(function() {
            res.redirect('/giftDepository');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
