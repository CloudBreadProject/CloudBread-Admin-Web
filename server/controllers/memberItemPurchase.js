function route(expressApp){

    expressApp.get('/memberItemPurchase', 'memberItemPurchase', expressApp.restrict, function (req, res) {
        expressApp.models.MemberItemPurchase.findAll().then(function(results) {
            res.render('memberItemPurchase/list', {
                title: 'MemberItemPurchase',
                listObjs: results
            });
        }).catch(function(err) {
            console.dir(err);
            next(err);
        });
    });

    expressApp.get('/memberItemPurchase/:id', 'memberItemPurchase.show', expressApp.restrict, function(req, res) {
        var memberItemPurchaseId = req.params.id;
        expressApp.models.MemberItemPurchase.findOne({
            where: {
                MemberItemPurchaseID: memberItemPurchaseId
            }
        })
        .then(function(result){
            res.render('memberItemPurchase/edit', {
                title: 'MemberItemPurchase',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/memberItemPurchase/create', 'memberItemPurchase.create', expressApp.restrict, function (req, res) {

        res.render('memberItemPurchase/create', {
            title: 'MemberItemPurchases Create'
        });
    });

    expressApp.post('/memberItemPurchase/', 'memberItemPurchase.store', expressApp.restrict, function(req, res) {
        res.redirect('/memberItemPurchase');
    });

    expressApp.post('/memberItemPurchase/edit', 'memberItemPurchase.update', expressApp.restrict, function(req, res) {
        res.redirect('/memberItemPurchase');
    });
}

module.exports = route;
