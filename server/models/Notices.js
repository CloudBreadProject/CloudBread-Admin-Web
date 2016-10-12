
module.exports = function(sequelize, DataTypes) {
  var Notice = sequelize.define('Notice', {
    NoticeID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}

    , NoticeCategory1 : { type : DataTypes.STRING}
    , NoticeCategory2 : { type : DataTypes.STRING}
    , NoticeCategory3 : { type : DataTypes.STRING}

    , TargetGroup : { type : DataTypes.STRING}
    , TargetOS : { type : DataTypes.STRING}
    , TargetDevice : { type : DataTypes.STRING}
    , NoticeImageLink : { type : DataTypes.STRING}
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

    , NoticeDurationFrom : { type : DataTypes.DATE}
    , NoticeDurationTo : { type : DataTypes.DATE}
    , OrderNumber : { type : DataTypes.INTEGER}
    , CreateAdminID : { type : DataTypes.STRING}
    , HideYN : { type : DataTypes.BOOLEAN}
    , DeleteYN : { type : DataTypes.BOOLEAN}
    , CreatedAt : { type : DataTypes.DATE}
    , UpdatedAt : { type : DataTypes.DATE}
    , DataFromRegion : { type : DataTypes.STRING}
    , DataFromRegionDT : { type : DataTypes.DATE}
  }, {
    timestamps: false,
    tableName: 'Notice'
  });
  return Notice;
};
