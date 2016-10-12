
module.exports = function(sequelize, DataTypes) {
  var MemberItems = sequelize.define('MemberItems', {
    MemberItemID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}

    , MemberID : { type : DataTypes.STRING}

    , ItemListID : { type : DataTypes.STRING}

    , ItemCount : { type : DataTypes.STRING}
    , ItemStatus : { type : DataTypes.STRING}

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

    , HideYN : { type : DataTypes.BOOLEAN}
    , DeleteYN : { type : DataTypes.BOOLEAN}
    , CreatedAt : { type : DataTypes.DATE}
    , UpdatedAt : { type : DataTypes.DATE}
    , DataFromRegion : { type : DataTypes.STRING}
    , DataFromRegionDT : { type : DataTypes.DATE}
  }, {
    timestamps: false,
    tableName: 'MemberItems'
  });
  return MemberItems;
};
