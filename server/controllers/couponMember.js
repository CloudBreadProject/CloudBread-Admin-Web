function route(expressApp){

    expressApp.get('/couponMember', 'couponMember', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.CouponMember;

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
                        res.render('couponMember/list', {
                            title: 'Coupon Members',
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

    expressApp.get('/couponMember/create', 'couponMember.create', expressApp.restrict, function (req, res) {

        res.render('couponMember/create', {
            title: 'CouponMembers Create'
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

    expressApp.post('/couponMember/', 'couponMember.store', expressApp.restrict, function(req, res, next) {
        var couponMember = req.body.CouponMember;
        expressApp.models.CouponMember.create({
            CouponMemberID : couponMember.CouponMemberID
            , CouponID: couponMember.CouponID
            , MemberID : couponMember.MemberID

            , sCol1 : couponMember.sCol1 || ''
            , sCol2 : couponMember.sCol2 || ''
            , sCol3 : couponMember.sCol3 || ''
            , sCol4 : couponMember.sCol4 || ''
            , sCol5 : couponMember.sCol5 || ''
            , sCol6 : couponMember.sCol6 || ''
            , sCol7 : couponMember.sCol7 || ''
            , sCol8 : couponMember.sCol8 || ''
            , sCol9 : couponMember.sCol9 || ''
            , sCol10 : couponMember.sCol10 || ''

            , HideYN : couponMember.HideYN
            , DeleteYN : couponMember.DeleteYN
            , DataFromRegion : couponMember.DataFromRegion || ''
            , DataFromRegionDT : couponMember.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'

        }).then(function() {
            res.redirect('/couponMember');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/couponMember/edit', 'couponMember.update', expressApp.restrict, function(req, res, next) {
        var couponMember = req.body.CouponMember;
        expressApp.models.CouponMember.update({
            CouponID: couponMember.CouponID
            , MemberID : couponMember.MemberID

            , sCol1 : couponMember.sCol1
            , sCol2 : couponMember.sCol2
            , sCol3 : couponMember.sCol3
            , sCol4 : couponMember.sCol4
            , sCol5 : couponMember.sCol5
            , sCol6 : couponMember.sCol6
            , sCol7 : couponMember.sCol7
            , sCol8 : couponMember.sCol8
            , sCol9 : couponMember.sCol9
            , sCol10 : couponMember.sCol10

            , HideYN : couponMember.HideYN
            , DeleteYN : couponMember.DeleteYN
        }, {
            where : {CouponMemberID : couponMember.CouponMemberID}
        }).then(function() {
            res.redirect('/couponMember');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
