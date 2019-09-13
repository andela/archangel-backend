module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('departments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dept_name: {
        type: Sequelize.TEXT,
      },
      line_manager: {
        type: Sequelize.TEXT,
      },
      manager_user_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('departments');
  },
};
