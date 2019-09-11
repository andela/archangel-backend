module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      staff_id: {
        type: Sequelize.STRING,
        unique: true,
      },
      first_name: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          msg: 'Please provide your First Name'
        }
      },
      last_name: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          msg: 'Please provide your Last Name'
        }
      },
      email: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: true,
        validate: {
          msg: 'Please provide a valid email address'
        }
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
          msg: 'Please provide a password'
        }
      },
      dept_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'departments',
          },
          key: 'id'
        }
      },
      dob: {
        type: Sequelize.DATE,
      },
      gender: {
        type: Sequelize.TEXT,
      },
      address: {
        type: Sequelize.TEXT,
      },
      preferred_lang: {
        type: Sequelize.TEXT,
      },
      preferred_currency: {
        type: Sequelize.TEXT,
      },
      role: {
        type: Sequelize.TEXT,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
