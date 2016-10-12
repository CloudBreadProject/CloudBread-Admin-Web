function route(expressApp){

    expressApp.get('/itemList', 'itemList', expressApp.restrict, function (req, res) {
        expressApp.models.ItemList.findAll().then(function(results) {
            res.render('itemList/list', {
                title: 'ItemList',
                listObjs: results
            });
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.get('/itemList/:id', 'itemList.show', expressApp.restrict, function(req, res) {
        var itemListId = req.params.id;
        expressApp.models.ItemList.findOne({
            where: {
                ItemListID: itemListId
            }
        })
        .then(function(result){
            res.render('itemList/edit', {
                title: 'ItemList',
                obj : result
            });
        }).catch(function(err) {
            next(err);
        });

    });

    expressApp.get('/itemList/create', 'itemList.create', expressApp.restrict, function (req, res) {

        res.render('itemList/create', {
            title: 'ItemLists Create'
        });
    });

    expressApp.post('/itemList/', 'itemList.store', expressApp.restrict, function(req, res) {
        res.redirect('/itemList');
    });

    expressApp.post('/itemList/edit', 'itemList.update', expressApp.restrict, function(req, res) {
        res.redirect('/itemList');
    });
}

module.exports = route;
