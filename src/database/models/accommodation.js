module.exports = (sequelize, DataTypes) => {
    const accommodations = sequelize.define('accommodations', {
        travel_id: DataTypes.INTEGER,
        location: DataTypes.TEXT,
        capacity: DataTypes.INTEGER,
        accommodation_name: DataTypes.TEXT
    }, {});

    accommodations.associate = (models) => {
        accommodations.hasOne(models.travels, {
            foreignKey: 'travel_id',
            onDelete: 'CASCADE'
        });
    };
    return accommodations;
};
