
module.exports = function(sequelize, DataTypes) {
  var Members = sequelize.define('Members', {
    MemberID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}
    , MemberPWD: { type : DataTypes.STRING }
    , EmailAddress : { type : DataTypes.STRING}
    , EmailConfirmedYN : { type : DataTypes.STRING, defaultValue: 'N'}
    , PhoneNumber1 : { type : DataTypes.STRING}
    , PhoneNumber2 : { type : DataTypes.STRING}
    , PINumber : { type : DataTypes.STRING}
    , Name1 : { type : DataTypes.STRING}
    , Name2 : { type : DataTypes.STRING}
    , Name3 : { type : DataTypes.STRING}
    , DOB : { type : DataTypes.STRING}
    , RecommenderID : { type : DataTypes.STRING}
    , MemberGroup : { type : DataTypes.STRING}
    , LastDeviceID : { type : DataTypes.STRING, defaultValue: ''}
    , LastIPaddress : { type : DataTypes.STRING, defaultValue: ''}
    , LastLoginDT : { type : DataTypes.STRING, defaultValue: ''}
    , LastLogoutDT : { type : DataTypes.STRING, defaultValue: ''}
    , LastMACAddress : { type : DataTypes.STRING, defaultValue: ''}
    , AccountBlockYN : { type : DataTypes.STRING, defaultValue: 'N'}
    , AccountBlockEndDT : { type : DataTypes.STRING, defaultValue: ''}
    , AnonymousYN : { type : DataTypes.STRING}
    , '3rdAuthProvider' : { type : DataTypes.STRING}
    , '3rdAuthID' : { type : DataTypes.STRING}
    , '3rdAuthParam' : { type : DataTypes.STRING}
    , PushNotificationID : { type : DataTypes.STRING}
    , PushNotificationProvider : { type : DataTypes.STRING}
    , PushNotificationGroup : { type : DataTypes.STRING}

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

    , TimeZoneID : { type : DataTypes.STRING}
    , HideYN : { type : DataTypes.BOOLEAN}
    , DeleteYN : { type : DataTypes.BOOLEAN}
    , DataFromRegion : { type : DataTypes.STRING}
    , DataFromRegionDT : { type : DataTypes.DATE}
    // , coins : { type : DataTypes.INTEGER.UNSIGNED, defaultValue: 0}
    // , hearts : { type : DataTypes.INTEGER(3).UNSIGNED, defaultValue: 0}
    // , highScore : { type : DataTypes.INTEGER.UNSIGNED, defaultValue: 0}
    // , loginTime : { type : DataTypes.DATE, defaultValue: '2002-06-05 00:00:00'
    //   , get:function(){var convertTime=new Date(this.getDataValue('loginTime')); return convertTime.getTime()/1000;}}
  }, {
    tableName: 'Members'
  });
  return Members;
};
