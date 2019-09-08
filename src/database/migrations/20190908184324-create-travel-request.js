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
          model: {
            tableName: 'users',
          },
          key: 'id'
        }
      },
      travel_type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['one-way', 'return']
      },
      origin: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          msg: 'Please provide the origin of travel'
        }
      },
      destination: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          msg: 'Please provide your destination'
        }
      },
      departure_date: {
        type: Sequelize.DATE,
        allowNull: false,
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
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          msg: 'Please provide reason for travel'
        }
      },
      accommodation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'accommodations',
          },
          key: 'id'
        }
      },
      approval_status: {
        type: Sequelize.ENUM,
        allowNull: true,
        values: ['accepted', 'pending', 'rejected'],
        defaultValue: 'pending'
      },
      multi_city: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('travel_requests');
  }
};
