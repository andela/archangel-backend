module.exports = (sequelize, DataTypes) => {
  const travel_request = sequelize.define('travel_requests', {
    user_id: DataTypes.INTEGER,
    travel_type: DataTypes.ENUM,
    origin: DataTypes.TEXT,
    destination: DataTypes.TEXT,
    departure_date: DataTypes.DATE,
    return_date: DataTypes.DATE,
    travel_purpose: DataTypes.TEXT,
    accommodation_id: DataTypes.INTEGER,
    approval_status: DataTypes.ENUM,
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
  };
  return travel_request;
};
