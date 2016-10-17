
module.exports = function(sequelize, DataTypes) {
  var StatsData = sequelize.define('StatsData', {
    StatID : { type : DataTypes.STRING, primaryKey: true, autoIncrement: false}

    , CategoryName : { type : DataTypes.STRING}
    , CountNum : { type : DataTypes.INTEGER}

    , Fields : { type : DataTypes.TEXT}

  }, {
    tableName: 'StatsData'
  });
  return StatsData;
};
