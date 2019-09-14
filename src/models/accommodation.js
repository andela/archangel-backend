module.exports = (sequelize, DataTypes) => {
    const accommodations = sequelize.define('accommodations', {
        location: DataTypes.TEXT,
        capacity: DataTypes.INTEGER,
        accommodation_name: DataTypes.TEXT,
    }, {});

    accommodations.associate = (models) => {
        accommodations.hasMany(models.travel_requests, {
            foreignKey: 'accommodation_id',
        });

        accommodations.belongsTo(models.travel_requests, {
            foreignKey: 'travel_id'
        });
    };

    return accommodations;
};
