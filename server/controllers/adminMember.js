function route(expressApp){

    expressApp.get('/adminMember', 'adminMember', expressApp.restrict, function (req, res) {
        expressApp.models.AdminMembers.findAll().then(function(results) {
            res.render('adminMember/list', {
                title: 'Members',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/adminMember/:id', 'adminMember.show', expressApp.restrict, function(req, res) {
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

    expressApp.get('/adminMember/create', 'adminMember.create', expressApp.restrict, function (req, res) {

        res.render('adminMember/create', {
            title: 'AdminMembers Create'
        });
    });

    expressApp.post('/adminMember/', 'adminMember.store', expressApp.restrict, function(req, res) {
        res.redirect('/adminMember');
    });

    expressApp.post('/adminMember/edit', 'adminMember.update', expressApp.restrict, function(req, res) {
        res.redirect('/adminMember');
    });
}

module.exports = route;
