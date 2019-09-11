module.exports = (sequelize, DataTypes) => {
    const notifications = sequelize.define('notifications', {
        user_id: DataTypes.INTEGER,
        travel_id: DataTypes.INTEGER,
        is_read: DataTypes.TEXT,
        line_manager_email: DataTypes.TEXT,
        line_manager_id: DataTypes.INTEGER,
        content: {
            type: DataTypes.STRING,
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
        notifications.belongsTo(models.travels, {
            foreignKey: 'travel_id',
            onDelete: 'CASCADE'
        });
        notifications.belongsTo(models.departments, {
            foreignKey: 'line_manager_id'
        });
        notifications.belongsTo(models.departments, {
            foreignKey: 'line_manager_email'
        });
    };

    return notifications;
};
