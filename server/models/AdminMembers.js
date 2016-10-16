
module.exports = function(sequelize, DataTypes) {
  var AdminMembers = sequelize.define('AdminMembers', {
    AdminMemberID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}
    , AdminMemberPWD: { type : DataTypes.STRING }
    , AdminMemberEmail : { type : DataTypes.STRING}
    , IDCreateAdminMember : { type : DataTypes.STRING}
    , AdminGroup : { type : DataTypes.STRING}
    , TimeZoneID : { type : DataTypes.STRING}
    , PINumber : { type : DataTypes.STRING}
    , Name1 : { type : DataTypes.STRING}
    , Name2 : { type : DataTypes.STRING}
    , Name3 : { type : DataTypes.STRING}
    , DOB : { type : DataTypes.STRING}
    , LastIPaddress : { type : DataTypes.STRING}
    , LastLoginDT : { type : DataTypes.STRING}
    , LastLogoutDT : { type : DataTypes.STRING}

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
    , DataFromRegion : { type : DataTypes.STRING}
    , DataFromRegionDT : { type : DataTypes.DATE}
  }, {
    tableName: 'AdminMembers'
  });
  return AdminMembers;
};
