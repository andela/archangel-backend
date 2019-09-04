module.exports = (sequelize, DataTypes) => {
    const notifications = sequelize.define('notifications', {
        travel_id: DataTypes.INTEGER,
        manager_email: DataTypes.TEXT,
        read_status: DataTypes.BOOLEAN
    }, {});
    notifications.associate = (models) => {
        // associations can be defined here
        notifications.belongsTo(models.travels, {
            foreignKey: 'travel_id'
        });
        notifications.hasMany(models.departments, {
            foreignKey: 'manager_email'
        });
    };
    return notifications;
};