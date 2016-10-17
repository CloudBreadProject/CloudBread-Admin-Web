
module.exports = function(sequelize, DataTypes) {
  var MemberItemPurchase = sequelize.define('MemberItemPurchase', {
    MemberItemPurchaseID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}

    , MemberID : { type : DataTypes.STRING}

    , ItemListID : { type : DataTypes.STRING}

    , PurchasePrice : { type : DataTypes.STRING}
    , PurchaseQuantity : { type : DataTypes.STRING}

    , PGinfo1 : { type : DataTypes.STRING}
    , PGinfo2 : { type : DataTypes.STRING}
    , PGinfo3 : { type : DataTypes.STRING}
    , PGinfo4 : { type : DataTypes.STRING}
    , PGinfo5 : { type : DataTypes.STRING}

    , PurchaseDeviceID : { type : DataTypes.STRING}
    , PurchaseDeviceIPAddress : { type : DataTypes.STRING}
    , PurchaseDeviceMACAddress : { type : DataTypes.STRING}
    , PurchaseDT : { type : DataTypes.STRING}

    , PurchaseCancelYN : { type : DataTypes.STRING}
    , PurchaseCancelDT : { type : DataTypes.STRING}
    , PurchaseCancelingStatus : { type : DataTypes.STRING}
    , PurchaseCancelReturnedAmount : { type : DataTypes.STRING}
    , PurchaseCancelDeviceID : { type : DataTypes.STRING}
    , PurchaseCancelDeviceIPAddress : { type : DataTypes.STRING}
    , PurchaseCancelDeviceMACAddress : { type : DataTypes.STRING}

    , sCol1 : { type : DataTypes.TEXT}
    , sCol2 : { type : DataTypes.TEXT}
    , sCol3 : { type : DataTypes.TEXT}
    , sCol4 : { type : DataTypes.TEXT}
    , sCol5 : { type : DataTypes.TEXT}
    , sCol6 : { type : DataTypes.TEXT}
    , sCol7 : { type : DataTypes.TEXT}
    , sCol8 : { type : DataTypes.TEXT}
    , sCol9 : { type : DataTypes.TEXT}
    , sCol10 : { type : DataTypes.TEXT}

    , PurchaseCancelConfirmAdminMemberID : { type : DataTypes.STRING}
    , HideYN : { type : DataTypes.BOOLEAN}
    , DeleteYN : { type : DataTypes.BOOLEAN}
    , DataFromRegion : { type : DataTypes.STRING}
    , DataFromRegionDT : { type : DataTypes.DATE}
  }, {
    tableName: 'MemberItemPurchases'
  });
  return MemberItemPurchase;
};
