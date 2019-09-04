'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('travel_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      travel_type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['one-way', 'return']
      },
      origin: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
            msg: 'Please provide your the location you are travelling from'
        }
      },
      destination: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
            msg: 'Please provide your the location you are travelling to'
        }
      },
      departure_date: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
            msg: 'Please provide the date of your departure'
        }
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            msg: 'Please provide the date of your return'
        }
      },
      travel_purpose: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
            msg: 'Please provide the reason for your travel'
        }
      },
      accommodation_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'accommodation',
          key: 'id'
        },
      },
      approval_status: {
        allowNull: false,
        defaultValue: 'pending',
        type: Sequelize.ENUM,
        values: ['accepted', 'pending', 'rejected']
      },
      multi_city: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('travel_requests');
  }
};
