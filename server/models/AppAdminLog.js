
module.exports = function(sequelize, DataTypes) {
  var AppAdminLog = sequelize.define('AppAdminLog', {
    PartitionKey : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}

    , RowKey : { type : DataTypes.STRING}
    , Timestamp : { type : DataTypes.STRING}

    , Category1 : { type : DataTypes.STRING}
    , Category2 : { type : DataTypes.STRING}
    , Category3 : { type : DataTypes.STRING}
    , Category4 : { type : DataTypes.STRING}
    , Category5 : { type : DataTypes.STRING}

    , LogDescription : { type : DataTypes.STRING}

    , sCol1 : { type : DataTypes.TEXT}
    , sCol2 : { type : DataTypes.TEXT}
    , sCol3 : { type : DataTypes.TEXT}
    , sCol4 : { type : DataTypes.TEXT}
    , sCol5 : { type : DataTypes.TEXT}

  }, {
    timestamps: false,
    tableName: 'AppAdminLog'
  });
  return AppAdminLog;
};
