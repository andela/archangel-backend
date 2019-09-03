module.exports = (sequelize, DataTypes) => {
    const travels = sequelize.define('travels', {
        user_id: DataTypes.INTEGER,
        origin: DataTypes.TEXT,
        destination: DataTypes.TEXT,
        departure_date: DataTypes.DATE,
        return_date: DataTypes.DATE,
        travel_purpose: DataTypes.TEXT,
        destination_count:DataTypes.INTEGER
    }, {});
    travels.associate = (models) => {
        travels.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
    };
    return travels;
};