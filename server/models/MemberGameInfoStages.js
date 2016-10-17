
module.exports = function(sequelize, DataTypes) {
  var MemberGameInfoStage = sequelize.define('MemberGameInfoStage', {
    MemberGameInfoStageID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}

    , MemberID : { type : DataTypes.STRING}

    , StageName : { type : DataTypes.STRING}
    , StageStatus : { type : DataTypes.STRING}

    , Category1 : { type : DataTypes.TEXT}
    , Category2 : { type : DataTypes.TEXT}
    , Category3 : { type : DataTypes.TEXT}

    , Mission1 : { type : DataTypes.TEXT}
    , Mission2 : { type : DataTypes.TEXT}
    , Mission3 : { type : DataTypes.TEXT}
    , Mission4 : { type : DataTypes.TEXT}
    , Mission5 : { type : DataTypes.TEXT}

    , StageStat1 : { type : DataTypes.TEXT}
    , StageStat2 : { type : DataTypes.TEXT}
    , StageStat3 : { type : DataTypes.TEXT}
    , StageStat4 : { type : DataTypes.TEXT}
    , StageStat5 : { type : DataTypes.TEXT}

    , Points : { type : DataTypes.TEXT}

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
    tableName: 'MemberGameInfoStages'
  });
  return MemberGameInfoStage;
};
