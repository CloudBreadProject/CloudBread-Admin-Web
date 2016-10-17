
module.exports = function(sequelize, DataTypes) {
  var ServerInfo = sequelize.define('ServerInfo', {
    InfoID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}

    , FEServerLists : { type : DataTypes.TEXT}
    , SocketServerLists : { type : DataTypes.TEXT}

    , Version : { type : DataTypes.STRING}

    , ResourceLink : { type : DataTypes.TEXT}
    , EULAText : { type : DataTypes.TEXT}

    , sCol1 : { type : DataTypes.TEXT}
    , sCol2 : { type : DataTypes.TEXT}
    , sCol3 : { type : DataTypes.TEXT}
    , sCol4 : { type : DataTypes.TEXT}
    , sCol5 : { type : DataTypes.TEXT}

    , DataFromRegion : { type : DataTypes.STRING}
    , DataFromRegionDT : { type : DataTypes.DATE}
  }, {
    tableName: 'ServerInfo'
  });
  return ServerInfo;
};
