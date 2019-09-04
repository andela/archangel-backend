module.exports = (sequelize, DataTypes) => {
    const notifications = sequelize.define('notifications', {
        travel_id: DataTypes.INTEGER,
        read_status: DataTypes.BOOLEAN
    }, {});
    notifications.associate = (models) => {
        // associations can be defined here
        notifications.belongsTo(models.travels, {
            foreignKey: 'travel_id',
        });
    };
    return notifications;
};