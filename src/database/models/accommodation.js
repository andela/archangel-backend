module.exports = (sequelize, DataTypes) => {
    const accommodation = sequelize.define('accommodation', {
        location: DataTypes.TEXT,
        capacity: DataTypes.INTEGER,
        accommodation_name: DataTypes.TEXT
    }, {});

    accommodation.associate = function (models) {
      accommodation.hasMany(models.travel_request, {
        foreignKey: 'accommodation_id',
      })
    }
    return accommodation;
};
