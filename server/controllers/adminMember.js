function route(expressApp){

    expressApp.get('/adminMember', 'adminMember', expressApp.restrict, function (req, res, next) {
        var perPage = 15;
        var currentPage = Number(req.query.page || 1);
        var filter = {};

        var Model = expressApp.models.AdminMembers;

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
                        res.render('adminMember/list', {
                            title: 'Admin Members',
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

    expressApp.get('/adminMember/create', 'adminMember.create', expressApp.restrict, function (req, res) {
        res.render('adminMember/create', {
            title: 'AdminMembers Create'
        });
    });

    expressApp.get('/adminMember/delete/:id', 'adminMember.delete', expressApp.restrict, function (req, res, next) {
        var adminMemberId = req.params.id;
        expressApp.models.AdminMembers.findOne({
            where: {
                AdminMemberID: adminMemberId
            }
        })
            .then(function(result){
                res.render('adminMember/delete', {
                    title: 'AdminMembers Delete'
                });
            }).catch(function(err) {
            next(err);
        });

    });

    expressApp.delete("/adminMember/delete/:id", function(req,res, next){
        var adminMemberId = req.params.id;
        expressApp.models.AdminMembers.destroy({
            where: {
                AdminMemberID: adminMemberId
            }
        })
            .then(function(result){
                console.log(result);
                res.redirect('/adminMember');
            })
            .catch(function(err) {
                next(err);
            });
    });

    expressApp.get('/adminMember/:id', 'adminMember.show', expressApp.restrict, function(req, res, next) {

        console.log(req.params);
        console.log(req.params.id);

        var adminMemberId = req.params.id;
        expressApp.models.AdminMembers.findOne({
            where: {
                AdminMemberID: adminMemberId
            }
        })
        .then(function(result){
            res.render('adminMember/edit', {
                title: 'AdminMember',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.post('/adminMember/', 'adminMember.store', expressApp.restrict, function(req, res, next) {
        var adminMembers = req.body.adminMember;
        expressApp.models.AdminMembers.create({
            AdminMemberID : adminMembers.AdminMemberID
            , AdminMemberPWD: adminMembers.AdminMemberPWD
            , AdminMemberEmail : adminMembers.AdminMemberEmail
            , IDCreateAdminMember : ''
            , AdminGroup : adminMembers.AdminGroup
            , TimeZoneID : adminMembers.TimeZoneID || 'Korea Standard Time'
            , PINumber : adminMembers.PINumber
            , Name1 : adminMembers.Name1
            , Name2 : adminMembers.Name2
            , Name3 : adminMembers.Name3
            , DOB : adminMembers.DOB || '19900101'
            , LastIPaddress : ''
            , LastLoginDT : '1900.1.1'
            , LastLogoutDT : '1900.1.1'

            , sCol1 : adminMembers.sCol1
            , sCol2 : adminMembers.sCol2
            , sCol3 : adminMembers.sCol3
            , sCol4 : adminMembers.sCol4
            , sCol5 : adminMembers.sCol5
            , sCol6 : adminMembers.sCol6
            , sCol7 : adminMembers.sCol7
            , sCol8 : adminMembers.sCol8
            , sCol9 : adminMembers.sCol9
            , sCol10 : adminMembers.sCol10

            , HideYN : adminMembers.HideYN
            , DeleteYN : adminMembers.DeleteYN
            , DataFromRegion : adminMembers.DataFromRegion || ''
            , DataFromRegionDT : adminMembers.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'
        }).then(function() {
            res.redirect('/adminMember');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/adminMember/edit', 'adminMember.update', expressApp.restrict, function(req, res, next) {
        var adminMembers = req.body.adminMember;
        expressApp.models.AdminMembers.update({
            AdminMemberEmail : adminMembers.AdminMemberEmail
            , AdminGroup : adminMembers.AdminGroup
            , TimeZoneID : adminMembers.TimeZoneID
            , PINumber : adminMembers.PINumber
            , Name1 : adminMembers.Name1
            , Name2 : adminMembers.Name2
            , Name3 : adminMembers.Name3
            , DOB : adminMembers.DOB

            , sCol1 : adminMembers.sCol1
            , sCol2 : adminMembers.sCol2
            , sCol3 : adminMembers.sCol3
            , sCol4 : adminMembers.sCol4
            , sCol5 : adminMembers.sCol5
            , sCol6 : adminMembers.sCol6
            , sCol7 : adminMembers.sCol7
            , sCol8 : adminMembers.sCol8
            , sCol9 : adminMembers.sCol9
            , sCol10 : adminMembers.sCol10

            , HideYN : adminMembers.HideYN
            , DeleteYN : adminMembers.DeleteYN
            , DataFromRegion : adminMembers.DataFromRegion || ''
        }, {
            where: { AdminMemberID: adminMembers.AdminMemberID}
        }). then(function() {
            res.redirect('/adminMember');
        }).catch(function(err) {
            next(err);
        });
    });
}

module.exports = route;
