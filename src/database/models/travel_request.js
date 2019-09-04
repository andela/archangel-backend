'use strict';
module.exports = (sequelize, DataTypes) => {
  const travel_request = sequelize.define('travel_request', {
    user_id: DataTypes.INTEGER,
    travel_type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['one-way', 'return']
    },
    origin: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    destination: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    departure_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
          msg: 'Please provide the date of your departure'
      }
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    travel_purpose: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    accommodation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    approval_status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['accepted', 'pending', 'rejected'],
      defaultValue: 'pending'
    },
    multi_city: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});

  travel_request.associate = function(models) {
    // associations can be defined here
      travel_request.belongsTo(models.users, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    }),

    travel_request.belongsTo(models.accommodation, {
      foreignKey: 'accommodation_id',
      onDelete: 'CASCADE'
    })
  };

  return travel_request;
};
