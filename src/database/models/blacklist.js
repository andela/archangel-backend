module.exports = (sequelize, DataTypes) => {
  const blacklist = sequelize.define('blacklist', {
    expired_tokens: DataTypes.STRING
  }, {});
  return blacklist;
};