
module.exports = function(sequelize, DataTypes) {
  var GameEvents = sequelize.define('GameEvents', {
    GameEventID  : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}
    , EventCategory1 : { type : DataTypes.STRING }
    , EventCategory2 : { type : DataTypes.STRING }
    , EventCategory3 : { type : DataTypes.STRING }
    , ItemListID : { type : DataTypes.STRING}

    , ItemCount : { type : DataTypes.STRING}
    , ItemStatus : { type : DataTypes.STRING}
    , TargetGroup : { type : DataTypes.STRING}
    , TargetOS : { type : DataTypes.STRING}
    , TargetDevice : { type : DataTypes.STRING}
    , EventImageLink : { type : DataTypes.STRING}
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

    , CreateAdminID : { type : DataTypes.STRING }

    , EventDurationFrom : { type : DataTypes.DATE }
    , EventDurationTo : { type : DataTypes.DATE }

    , OrderNumber : { type : DataTypes.INTEGER }

    , HideYN : { type : DataTypes.BOOLEAN}
    , DeleteYN : { type : DataTypes.BOOLEAN}
    , CreatedAt : { type : DataTypes.DATE}
    , UpdatedAt : { type : DataTypes.DATE}
    , DataFromRegion : { type : DataTypes.STRING}
    , DataFromRegionDT : { type : DataTypes.DATE}
  }, {
    timestamps: false,
    tableName: 'GameEvents'
  });
  return GameEvents;
};
