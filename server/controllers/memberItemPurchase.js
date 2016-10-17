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

    expressApp.get('/memberItemPurchase/create', 'memberItemPurchase.create', expressApp.restrict, function (req, res) {

        res.render('memberItemPurchase/create', {
            title: 'MemberItemPurchases Create'
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

    expressApp.post('/memberItemPurchase/', 'memberItemPurchase.store', expressApp.restrict, function(req, res, next) {
        var purchase = req.body.purchase;
        expressApp.models.MemberItemPurchase.create({
            MemberItemPurchaseID : purchase.MemberItemPurchaseID

            , MemberID : purchase.MemberID

            , ItemListID : purchase.ItemListID

            , PurchasePrice : purchase.PurchasePrice
            , PurchaseQuantity : purchase.PurchaseQuantity

            , PGinfo1 : purchase.PGinfo1
            , PGinfo2 : purchase.PGinfo2
            , PGinfo3 : purchase.PGinfo3
            , PGinfo4 : purchase.PGinfo4
            , PGinfo5 : purchase.PGinfo5

            , PurchaseDeviceID : ''
            , PurchaseDeviceIPAddress : ''
            , PurchaseDeviceMACAddress : ''
            , PurchaseDT : ''

            , PurchaseCancelYN : 'N'
            , PurchaseCancelDT : ''
            , PurchaseCancelingStatus : 0
            , PurchaseCancelReturnedAmount : 0
            , PurchaseCancelDeviceID : ''
            , PurchaseCancelDeviceIPAddress : ''
            , PurchaseCancelDeviceMACAddress : ''

            , sCol1 : purchase.sCol1 || ''
            , sCol2 : purchase.sCol2 || ''
            , sCol3 : purchase.sCol3 || ''
            , sCol4 : purchase.sCol4 || ''
            , sCol5 : purchase.sCol5 || ''
            , sCol6 : purchase.sCol6 || ''
            , sCol7 : purchase.sCol7 || ''
            , sCol8 : purchase.sCol8 || ''
            , sCol9 : purchase.sCol9 || ''
            , sCol10 : purchase.sCol10 || ''

            , PurchaseCancelConfirmAdminMemberID : ''

            , HideYN : purchase.HideYN
            , DeleteYN : purchase.DeleteYN
            , DataFromRegion : purchase.DataFromRegion || ''
            , DataFromRegionDT : purchase.DataFromRegionDT || '1900-01-01 00:00:00:000 +00:00'

        }).then(function() {
            res.redirect('/memberItemPurchase');
        }).catch(function(err) {
            next(err);
        });
    });

    expressApp.post('/memberItemPurchase/edit', 'memberItemPurchase.update', expressApp.restrict, function(req, res) {
        res.redirect('/memberItemPurchase');
    });
}

module.exports = route;
