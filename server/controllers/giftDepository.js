function route(expressApp){

    expressApp.get('/giftDepository', 'giftDepository', expressApp.restrict, function (req, res) {
        expressApp.models.GiftDepository.findAll().then(function(results) {
            res.render('giftDepository/list', {
                title: 'GiftDepository',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/giftDepository/:id', 'giftDepository.show', expressApp.restrict, function(req, res) {
        var giftDepositoryId = req.params.id;
        expressApp.models.GiftDepository.findOne({
            where: {
                GiftDepositoryID: giftDepositoryId
            }
        })
        .then(function(result){
            res.render('giftDepository/edit', {
                title: 'GiftDepository',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/giftDepository/create', 'giftDepository.create', expressApp.restrict, function (req, res) {

        res.render('giftDepository/create', {
            title: 'GiftDepository Create'
        });
    });

    expressApp.post('/giftDepository/', 'giftDepository.store', expressApp.restrict, function(req, res) {
        res.redirect('/giftDepository');
    });

    expressApp.post('/giftDepository/edit', 'giftDepository.update', expressApp.restrict, function(req, res) {
        res.redirect('/giftDepository');
    });
}

module.exports = route;
