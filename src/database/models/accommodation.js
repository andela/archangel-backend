module.exports = (sequelize, DataTypes) => {
    const accommodation = sequelize.define('accommodation', {
        travel_id: DataTypes.INTEGER,
        location: DataTypes.TEXT,
        capacity: DataTypes.INTEGER,
        accommodation_name: DataTypes.TEXT
    }, { freezeTableName: true });

    accommodation.associate = (models) => {
        accommodation.hasOne(models.travel, {
            foreignKey: 'travel_id',
            onDelete: 'CASCADE'
        });
    };
    return accommodation;
};
