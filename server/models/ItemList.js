
module.exports = function(sequelize, DataTypes) {
  var ItemList = sequelize.define('ItemList', {
    ItemListID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}
    , ItemName: { type : DataTypes.STRING }
    , ItemDescription : { type : DataTypes.TEXT}
    , ItemPrice : { type : DataTypes.STRING}
    , ItemSellPrice : { type : DataTypes.STRING}
    , ItemCategory1 : { type : DataTypes.STRING}
    , ItemCategory2 : { type : DataTypes.STRING}
    , ItemCategory3 : { type : DataTypes.STRING}

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

    , ItemCreateAdminID : { type : DataTypes.STRING }
    , ItemUpdateAdminID : { type : DataTypes.STRING }

    , HideYN : { type : DataTypes.BOOLEAN}
    , DeleteYN : { type : DataTypes.BOOLEAN}
    , CreatedAt : { type : DataTypes.DATE}
    , UpdatedAt : { type : DataTypes.DATE}
    , DataFromRegion : { type : DataTypes.STRING}
    , DataFromRegionDT : { type : DataTypes.DATE}
  }, {
    timestamps: false,
    tableName: 'ItemList'
  });
  return ItemList;
};
