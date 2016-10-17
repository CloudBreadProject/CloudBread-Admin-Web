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

    expressApp.get('/memberItem/create', 'memberItem.create', expressApp.restrict, function (req, res) {

        res.render('memberItem/create', {
            title: 'MemberItems Create'
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

    expressApp.post('/memberItem/', 'memberItem.store', expressApp.restrict, function(req, res, next) {
        var memberItem = req.body.memberItem;
        expressApp.models.MemberItems.create({
            MemberItemID : memberItem.MemberItemID

            , MemberID : memberItem.MemberID

            , ItemListID : memberItem.ItemListID

            , ItemCount : memberItem.ItemCount
            , ItemStatus : memberItem.ItemStatus

            , sCol1 : memberItem.sCol1 || ''
            , sCol2 : memberItem.sCol2 || ''
            , sCol3 : memberItem.sCol3 || ''
            , sCol4 : memberItem.sCol4 || ''
            , sCol5 : memberItem.sCol5 || ''
            , sCol6 : memberItem.sCol6 || ''
            , sCol7 : memberItem.sCol7 || ''
            , sCol8 : memberItem.sCol8 || ''
            , sCol9 : memberItem.sCol9 || ''
            , sCol10 : memberItem.sCol10 || ''

            , HideYN : memberItem.HideYN
            , DeleteYN : memberItem.DeleteYN
            , DataFromRegion : memberItem.DataFromRegion || ''
            , DataFromRegionDT : memberItem.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'

        }).then(function() {
            res.redirect('/memberItem');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/memberItem/edit', 'memberItem.update', expressApp.restrict, function(req, res) {
        res.redirect('/memberItem');
    });
}

module.exports = route;
