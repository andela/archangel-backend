module.exports = (sequelize, DataTypes) => {
  const accommodation_feedbacks = sequelize.define('accommodation_feedbacks', {
    accommodation_id: DataTypes.INTEGER,
    accommodation_name: DataTypes.TEXT,
    feedback: DataTypes.TEXT,
    author_name: DataTypes.TEXT,
    author_email: DataTypes.TEXT
  }, {});
  accommodation_feedbacks.associate = (models) => {
    accommodation_feedbacks.belongsTo(models.accommodations, {
      foreignKey: 'accommodation_id',
    });
  };
  return accommodation_feedbacks;
};
