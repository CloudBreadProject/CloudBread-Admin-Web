function route(expressApp){

    expressApp.get('/couponMember', 'couponMember', expressApp.restrict, function (req, res) {
        expressApp.models.CouponMember.findAll().then(function(results) {
            res.render('couponMember/list', {
                title: 'Members',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/couponMember/:id', 'couponMember.show', expressApp.restrict, function(req, res) {
        var couponMemberId = req.params.id;
        expressApp.models.CouponMember.findOne({
            where: {
                CouponMemberID: couponMemberId
            }
        })
        .then(function(result){
            res.render('couponMember/edit', {
                title: 'CouponMember',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/couponMember/create', 'couponMember.create', expressApp.restrict, function (req, res) {

        res.render('couponMember/create', {
            title: 'CouponMembers Create'
        });
    });

    expressApp.post('/couponMember/', 'couponMember.store', expressApp.restrict, function(req, res) {
        res.redirect('/couponMember');
    });

    expressApp.post('/couponMember/edit', 'couponMember.update', expressApp.restrict, function(req, res) {
        res.redirect('/couponMember');
    });
}

module.exports = route;
