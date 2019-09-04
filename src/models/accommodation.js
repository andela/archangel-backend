module.exports = (sequelize, DataTypes) => {
    const accommodations = sequelize.define('accommodations', {
        location: DataTypes.TEXT,
        capacity: DataTypes.INTEGER,
        accommodation_name: DataTypes.TEXT
    }, {});

    return accommodations;
};
