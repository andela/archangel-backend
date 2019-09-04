module.exports = (sequelize, DataTypes) => {
    const accommodation = sequelize.define('accommodation', {
        location: DataTypes.TEXT,
        capacity: DataTypes.INTEGER,
        accommodation_name: DataTypes.TEXT
    }, {});

    accommodation.associate = (models) => {
        accommodation.hasOne(models.travels, {
            foreignKey: 'travel_id',
            onDelete: 'CASCADE'
        });
    };
    return accommodation;
};
