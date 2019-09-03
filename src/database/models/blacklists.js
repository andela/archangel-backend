module.exports = (sequelize, DataTypes) => {
  const blacklists = sequelize.define('blacklists', {
    expired_tokens: DataTypes.STRING
  }, { freezeTableName: true });
  return blacklists;
};
