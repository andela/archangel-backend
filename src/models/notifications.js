module.exports = (sequelize, DataTypes) => {
  const notifications =sequelize.define('notifications', {
    recipient_id: DataTypes.INTEGER,
    travel_id: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    is_read: DataTypes.BOOLEAN
  }, {});
  notifications.associate = (models) => {
    notifications.belongsTo(models.users, {
      foreignKey: 'recipient_id',
    });
  };
  return notifications;
};
