module.exports = (sequelize, DataTypes) => {
  const dummytable = sequelize.define('dummytable', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {});
  return dummytable;
};