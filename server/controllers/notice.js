function route(expressApp){

    expressApp.get('/notice', 'notice', expressApp.restrict, function (req, res) {
        expressApp.models.Notices.findAll().then(function(results) {
            res.render('notice/list', {
                title: 'Notices',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/notice/:id', 'notice.show', expressApp.restrict, function(req, res) {
        var memberId = req.params.id;
        expressApp.models.Notices.findOne({
            where: {
                MemberID: memberId
            }
        })
        .then(function(result){
            res.render('notice/edit', {
                title: 'Notices',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/notice/create', 'notice.create', expressApp.restrict, function (req, res) {

        res.render('notice/create', {
            title: 'Notices Create'
        });
    });

    expressApp.post('/notice/', 'notice.store', expressApp.restrict, function(req, res) {
        res.redirect('/notice');
    });

    expressApp.post('/notice/edit', 'notice.update', expressApp.restrict, function(req, res) {
        res.redirect('/notice');
    });
}

module.exports = route;
