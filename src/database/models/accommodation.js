module.exports = (sequelize, DataTypes) => {
    const accommodations = sequelize.define('accommodations', {
        location: DataTypes.TEXT,
        capacity: DataTypes.INTEGER,
        accommodation_name: DataTypes.TEXT
    }, {});

    accommodations.associate = function (models) {
      accommodations.hasMany(models.travel_request, {
        foreignKey: 'accommodation_id',
      })
    }
    return accommodations;
};
