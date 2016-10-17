
module.exports = function(sequelize, DataTypes) {
  var MemberAccountBlockLog = sequelize.define('MemberAccountBlockLog', {
    MemberAccountBlockID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}
    , MemberID: { type : DataTypes.STRING }

    , MemberAccountBlockReasonCategory1 : { type : DataTypes.STRING}
    , MemberAccountBlockReasonCategory2 : { type : DataTypes.STRING}
    , MemberAccountBlockReasonCategory3 : { type : DataTypes.STRING}

    , MemberAccountBlockReason : { type : DataTypes.TEXT}
    , MemberAccountBlockProcess : { type : DataTypes.STRING}

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

    , CreateAdminID : { type : DataTypes.STRING}
    , HideYN : { type : DataTypes.BOOLEAN}
    , DeleteYN : { type : DataTypes.BOOLEAN}
    , DataFromRegion : { type : DataTypes.STRING}
    , DataFromRegionDT : { type : DataTypes.DATE}
  }, {
    tableName: 'MemberAccountBlockLog'
  });
  return MemberAccountBlockLog;
};
