function route(expressApp){

    expressApp.get('/coupon', 'coupon', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.Coupon;

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
                        res.render('coupon/list', {
                            title: 'Coupon',
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

    expressApp.get('/coupon/create', 'coupon.create', expressApp.restrict, function (req, res) {
        res.render('coupon/create', {
            title: 'Coupon Create'
        });
    });

    expressApp.get('/coupon/:id', 'coupon.show', expressApp.restrict, function(req, res) {
        var couponId = req.params.id;
        expressApp.models.Coupon.findOne({
            where: {
                CouponID: couponId
            }
        })
        .then(function(result){
            res.render('coupon/edit', {
                title: 'Coupon',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/coupon/', 'coupon.store', expressApp.restrict, function(req, res, next) {
        var coupon = req.body.coupon;
        expressApp.models.Coupon.create({
            CouponID : coupon.CouponID
            , CouponCategory1 : coupon.CouponCategory1
            , CouponCategory2 : coupon.CouponCategory2
            , CouponCategory3 : coupon.CouponCategory3
            , ItemListID : coupon.ItemListID

            , ItemCount : coupon.ItemCount
            , ItemStatus : coupon.ItemStatus
            , TargetGroup : coupon.TargetGroup
            , TargetOS : coupon.TargetOS
            , TargetDevice : coupon.TargetDevice
            , Title : coupon.Title
            , Content : coupon.Content

            , sCol1 : coupon.sCol1 || ''
            , sCol2 : coupon.sCol2 || ''
            , sCol3 : coupon.sCol3 || ''
            , sCol4 : coupon.sCol4 || ''
            , sCol5 : coupon.sCol5 || ''
            , sCol6 : coupon.sCol6 || ''
            , sCol7 : coupon.sCol7 || ''
            , sCol8 : coupon.sCol8 || ''
            , sCol9 : coupon.sCol9 || ''
            , sCol10 : coupon.sCol10 || ''

            , CouponDurationFrom : coupon.CouponDurationFrom
            , CouponDurationTo  : coupon.CouponDurationTo
            , OrderNumber   : coupon.OrderNumber
            , CreateAdminID    : coupon.CreateAdminID || ''
            , HideYN : coupon.HideYN
            , DupeYN : coupon.DupeYN
            , DeleteYN : coupon.DeleteYN
            , DataFromRegion : coupon.DataFromRegion || ''
            , DataFromRegionDT : coupon.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'
        }).then(function() {
            res.redirect('/coupon');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/coupon/edit', 'coupon.update', expressApp.restrict, function(req, res, next) {
        var coupon = req.body.coupon;
        expressApp.models.Coupon.update({
            CouponCategory1 : coupon.CouponCategory1
            , CouponCategory2 : coupon.CouponCategory2
            , CouponCategory3 : coupon.CouponCategory3
            , ItemListID : coupon.ItemListID

            , ItemCount : coupon.ItemCount
            , ItemStatus : coupon.ItemStatus
            , TargetGroup : coupon.TargetGroup
            , TargetOS : coupon.TargetOS
            , TargetDevice : coupon.TargetDevice
            , Title : coupon.Title
            , Content : coupon.Content

            , sCol1 : coupon.sCol1
            , sCol2 : coupon.sCol2
            , sCol3 : coupon.sCol3
            , sCol4 : coupon.sCol4
            , sCol5 : coupon.sCol5
            , sCol6 : coupon.sCol6
            , sCol7 : coupon.sCol7
            , sCol8 : coupon.sCol8
            , sCol9 : coupon.sCol9
            , sCol10 : coupon.sCol10

            , CouponDurationFrom : coupon.CouponDurationFrom
            , CouponDurationTo  : coupon.CouponDurationTo
            , OrderNumber   : coupon.OrderNumber
            , HideYN : coupon.HideYN
            , DupeYN : coupon.DupeYN
            , DeleteYN : coupon.DeleteYN
        }, {
            where: { CouponID: coupon.CouponID}
        }).then(function() {
            res.redirect('/coupon');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
