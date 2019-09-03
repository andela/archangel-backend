module.exports = (sequelize, DataTypes) => {
    const travel = sequelize.define('travel', {
        user_id: DataTypes.INTEGER,
        origin: DataTypes.TEXT,
        destination: DataTypes.TEXT,
        departure_date: DataTypes.DATE,
        return_date: DataTypes.DATE,
        travel_purpose: DataTypes.TEXT,
    }, { freezeTableName: true });
    travel.associate = (models) => {
        travel.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
    };

    return travel;
};
