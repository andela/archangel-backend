module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    user_id: DataTypes.INTEGER,
    travel_id: DataTypes.INTEGER,
    is_read: DataTypes.TEXT,
    line_manager_email: DataTypes.TEXT,
    line_manager_id: DataTypes.INTEGER,
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'notification content cannot be empty'
        }
      }
    }
  }, {});
  notifications.associate = (models) => {
    notifications.belongsTo(models.users, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });

    notifications.belongsTo(models.travel_requests, {
      foreignKey: 'travel_id',
      onDelete: 'CASCADE'
    });

    notifications.hasMany(models.departments, {
      foreignKey: 'line_manager_id',
      onDelete: 'CASCADE'
    });

    notifications.hasMany(models.departments, {
      foreignKey: 'line_manager_email',
      onDelete: 'CASCADE'
    });
  };
  return notifications;
};
