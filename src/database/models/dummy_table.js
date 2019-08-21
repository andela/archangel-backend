module.exports = (sequelize, DataTypes) => {
  const dummy_table = sequelize.define('dummy_table', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {});

  return dummy_table;
};