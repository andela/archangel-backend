module.exports = (sequelize, DataTypes) => {
    const notifications = sequelize.define('notifications', {
        user_id: DataTypes.INTEGER,
        travel_id: DataTypes.INTEGER,
        is_read: DataTypes.TEXT,
        line_manager_email: DataTypes.TEXT,
        line_manager_id: DataTypes.INTEGER,
        receiver: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'notification receiver cannot be empty'
                }
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'notification content cannot be empty'
                }
            }
        },
    }, {});

    return notifications;
};
