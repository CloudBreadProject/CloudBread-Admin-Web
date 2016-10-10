
module.exports = function(sequelize, DataTypes) {
  var MemberGameInfo = sequelize.define('MemberGameInfo', {
    MemberID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}

    , Level : { type : DataTypes.STRING}
    , Exps : { type : DataTypes.STRING}

    , UserSTAT1 : { type : DataTypes.TEXT}
    , UserSTAT2 : { type : DataTypes.TEXT}
    , UserSTAT3 : { type : DataTypes.TEXT}
    , UserSTAT4 : { type : DataTypes.TEXT}
    , UserSTAT5 : { type : DataTypes.TEXT}
    , UserSTAT6 : { type : DataTypes.TEXT}
    , UserSTAT7 : { type : DataTypes.TEXT}
    , UserSTAT8 : { type : DataTypes.TEXT}
    , UserSTAT9 : { type : DataTypes.TEXT}
    , UserSTAT10 : { type : DataTypes.TEXT}

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
    tableName: 'MemberGameInfo'
  });
  return MemberGameInfo;
};
