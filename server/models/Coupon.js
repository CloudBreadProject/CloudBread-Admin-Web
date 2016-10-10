
module.exports = function(sequelize, DataTypes) {
  var Coupon = sequelize.define('Coupon', {
    CouponID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}
    , CouponCategory1 : { type : DataTypes.STRING}
    , CouponCategory2 : { type : DataTypes.STRING}
    , CouponCategory3 : { type : DataTypes.STRING}
    , ItemListID : { type : DataTypes.STRING}

    , ItemCount : { type : DataTypes.STRING}
    , ItemStatus : { type : DataTypes.STRING}
    , TargetGroup : { type : DataTypes.STRING}
    , TargetOS : { type : DataTypes.STRING}
    , TargetDevice : { type : DataTypes.STRING}
    , Title : { type : DataTypes.STRING}
    , Content : { type : DataTypes.TEXT}

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

    , CouponDurationFrom : { type : DataTypes.DATE }
    , CouponDurationTo : { type : DataTypes.DATE }
    , OrderNumber : { type : DataTypes.INTEGER }
    , DupeYN : { type : DataTypes.STRING }
    , CreateAdminID : { type : DataTypes.STRING }

    , HideYN : { type : DataTypes.BOOLEAN}
    , DeleteYN : { type : DataTypes.BOOLEAN}
    , CreatedAt : { type : DataTypes.DATE}
    , UpdatedAt : { type : DataTypes.DATE}
    , DataFromRegion : { type : DataTypes.STRING}
    , DataFromRegionDT : { type : DataTypes.DATE}
  }, {
    timestamps: false,
    tableName: 'Coupon'
  });
  return Coupon;
};
