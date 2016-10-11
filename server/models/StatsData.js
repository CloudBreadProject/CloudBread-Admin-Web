
module.exports = function(sequelize, DataTypes) {
  var StatsData = sequelize.define('StatsData', {
    StatID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}

    , CategoryName : { type : DataTypes.STRING}
    , CountNum : { type : DataTypes.INTEGER}

    , Fields : { type : DataTypes.TEXT}

    , CreatedAt : { type : DataTypes.DATE}
    , UpdatedAt : { type : DataTypes.DATE}
  }, {
    timestamps: false,
    tableName: 'StatsData'
  });
  return StatsData;
};
