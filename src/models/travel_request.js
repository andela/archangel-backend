/* eslint-disable import/no-dynamic-require */
module.exports = (sequelize, DataTypes) => {
    const travel_request = sequelize.define('travel_requests', {
        user_id: DataTypes.INTEGER,
        travel_type: {
            type: DataTypes.ENUM,
            values: ['one-way', 'return']
        },
        origin: DataTypes.TEXT,
        destination: DataTypes.TEXT,
        departure_date: DataTypes.DATE,
        return_date: DataTypes.DATE,
        travel_purpose: DataTypes.TEXT,
        accommodation_id: DataTypes.INTEGER,
        dept_id: DataTypes.INTEGER,
        approval_status: {
            type: DataTypes.ENUM,
            values: ['accepted', 'pending', 'rejected'],
            defaultValue: 'pending'
        },
        multi_city: DataTypes.BOOLEAN
    }, {});
    travel_request.associate = (models) => {
        travel_request.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });

        travel_request.belongsTo(models.accommodations, {
            foreignKey: 'accommodation_id',
            onDelete: 'CASCADE'
        });

        travel_request.hasMany(models.accommodations, {
            foreignKey: 'travel_id',
            onDelete: 'CASCADE'
        });

        travel_request.hasMany(models.comments, {
            foreignKey: 'travel_id',
            onDelete: 'CASCADE'
        });
    };
    return travel_request;
};
