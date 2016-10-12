function route(expressApp){

    expressApp.get('/coupon', 'coupon', expressApp.restrict, function (req, res) {
        expressApp.models.Coupon.findAll().then(function(results) {
            res.render('coupon/list', {
                title: 'Coupon',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
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

    expressApp.get('/coupon/create', 'coupon.create', expressApp.restrict, function (req, res) {

        res.render('coupon/create', {
            title: 'Coupon Create'
        });
    });

    expressApp.post('/coupon/', 'coupon.store', expressApp.restrict, function(req, res) {
        res.redirect('/coupon');
    });

    expressApp.post('/coupon/edit', 'coupon.update', expressApp.restrict, function(req, res) {
        res.redirect('/coupon');
    });
}

module.exports = route;
