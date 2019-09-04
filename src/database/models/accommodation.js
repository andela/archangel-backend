module.exports = (sequelize, DataTypes) => {
    const accommodation = sequelize.define('accommodation', {
        location: DataTypes.TEXT,
        capacity: DataTypes.INTEGER,
        accommodation_name: DataTypes.TEXT
    }, {});

    return accommodation;
};
