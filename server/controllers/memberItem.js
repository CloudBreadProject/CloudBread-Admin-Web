function route(expressApp){

    expressApp.get('/memberItem', 'memberItem', expressApp.restrict, function (req, res) {
        expressApp.models.MemberItems.findAll().then(function(results) {
            res.render('memberItem/list', {
                title: 'MemberItems',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/memberItem/:id', 'memberItem.show', expressApp.restrict, function(req, res) {
        var memberItemId = req.params.id;
        expressApp.models.MemberItems.findOne({
            where: {
                MemberItemID: memberItemId
            }
        })
        .then(function(result){
            res.render('memberItem/edit', {
                title: 'MemberItems',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/memberItem/create', 'memberItem.create', expressApp.restrict, function (req, res) {

        res.render('memberItem/create', {
            title: 'MemberItems Create'
        });
    });

    expressApp.post('/memberItem/', 'memberItem.store', expressApp.restrict, function(req, res) {
        res.redirect('/memberItem');
    });

    expressApp.post('/memberItem/edit', 'memberItem.update', expressApp.restrict, function(req, res) {
        res.redirect('/memberItem');
    });
}

module.exports = route;
