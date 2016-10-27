function route(expressApp){

    expressApp.get('/member', 'member', expressApp.restrict, function (req, res, next) {

        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.Members;

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
                    res.render('member/list', {
                        title: 'Members',
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

    expressApp.get('/member/create', 'member.create', expressApp.restrict, function (req, res) {
        res.render('member/create', {
            title: 'Members Create'
        });
    });

    expressApp.get('/member/delete/:id', 'member.delete', expressApp.restrict, function(req, res, next) {
        var memberId = req.params.id;
        expressApp.models.Members.findOne({
            where: {
                MemberID: memberId
            }
        })
        .then(function(result){
            res.render('member/delete', {
                title: 'Members Delete',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.delete("/member/delete/", 'member.destroy', expressApp.restrict, function(req,res, next){
        var memberId = req.body.id;
        expressApp.models.Members.destroy({
            where: {
                MemberID: memberId
            }
        })
            .then(function(result){
                console.log(result);
                res.redirect('/member');
            })
            .catch(function(err) {
                next(err);
            });
    });

    expressApp.get('/member/:id', 'member.show', expressApp.restrict, function(req, res, next) {
        var memberId = req.params.id;
        expressApp.models.Members.findOne({
            where: {
                MemberID: memberId
            }
        })
        .then(function(result){
            res.render('member/edit', {
                title: 'Members',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/member/', 'member.store', expressApp.restrict, function(req, res, next) {
        var member = req.body.member;
        expressApp.models.Members.create({

            MemberID : member.MemberID
            , MemberPWD: member.MemberPWD
            , EmailAddress : member.EmailAddress
            , EmailConfirmedYN : 'Y'
            , PhoneNumber1 : member.PhoneNumber1 || ''
            , PhoneNumber2 : member.PhoneNumber2 || ''
            , PINumber : member.PINumber || ''
            , Name1 : member.Name1 || ''
            , Name2 : member.Name2 || ''
            , Name3 : member.Name3 || ''
            , DOB : member.DOB  || '19900101'
            , RecommenderID : member.RecommenderID || ''
            , MemberGroup : member.MemberGroup || ''
            , LastDeviceID : ''
            , LastIPaddress : ''
            , LastLoginDT : ''
            , LastLogoutDT : ''
            , LastMACAddress : ''
            , AccountBlockYN : 'N'
            , AccountBlockEndDT : ''
            , AnonymousYN : 'N'
            , '3rdAuthProvider' : member.thirdAuthProvider || ''
            , '3rdAuthID' : member.thirdAuthID || ''
            , '3rdAuthParam' : member.thirdAuthParam || ''
            , PushNotificationID : member.PushNotificationID || ''
            , PushNotificationProvider : member.PushNotificationProvider || ''
            , PushNotificationGroup : member.PushNotificationGroup || ''

            , sCol1 : member.sCol1 || ''
            , sCol2 : member.sCol2 || ''
            , sCol3 : member.sCol3 || ''
            , sCol4 : member.sCol4 || ''
            , sCol5 : member.sCol5 || ''
            , sCol6 : member.sCol6 || ''
            , sCol7 : member.sCol7 || ''
            , sCol8 : member.sCol8 || ''
            , sCol9 : member.sCol9 || ''
            , sCol10 : member.sCol10 || ''

            , TimeZoneID : member.TimeZoneID || 'Korea Standard Time'
            , HideYN : member.HideYN
            , DeleteYN : member.DeleteYN
            , DataFromRegion : member.DataFromRegion || ''
            , DataFromRegionDT : member.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'
        }).then(function() {
            res.redirect('/member');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/member/edit', 'member.update', expressApp.restrict, function(req, res, next) {
        var member = req.body.member;
        expressApp.models.Members.update({
            EmailAddress: member.EmailAddress
            , PhoneNumber1: member.PhoneNumber1 || ''
            , PhoneNumber2: member.PhoneNumber2 || ''
            , PINumber: member.PINumber || ''
            , Name1: member.Name1 || ''
            , Name2: member.Name2 || ''
            , Name3: member.Name3 || ''
            , DOB: member.DOB || '19900101'
            , RecommenderID: member.RecommenderID || ''
            , MemberGroup: member.MemberGroup || ''
            , AccountBlockYN: member.AccountBlockYN
            , AccountBlockEndDT: member.AccountBlockEndDT
            , '3rdAuthProvider': member.thirdAuthProvider || ''
            , '3rdAuthID': member.thirdAuthID || ''
            , '3rdAuthParam': member.thirdAuthParam || ''
            , PushNotificationID: member.PushNotificationID || ''
            , PushNotificationProvider: member.PushNotificationProvider || ''
            , PushNotificationGroup: member.PushNotificationGroup || ''

            , sCol1: member.sCol1 || ''
            , sCol2: member.sCol2 || ''
            , sCol3: member.sCol3 || ''
            , sCol4: member.sCol4 || ''
            , sCol5: member.sCol5 || ''
            , sCol6: member.sCol6 || ''
            , sCol7: member.sCol7 || ''
            , sCol8: member.sCol8 || ''
            , sCol9: member.sCol9 || ''
            , sCol10: member.sCol10 || ''

            , TimeZoneID: member.TimeZoneID || 'Korea Standard Time'
            , HideYN: member.HideYN
            , DeleteYN: member.DeleteYN
            , DataFromRegion: member.DataFromRegion || ''
        }, {
            where: { MemberID: member.MemberID}
        }). then(function() {
            res.redirect('/member');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
