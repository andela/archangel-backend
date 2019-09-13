module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('departments', [{
      id: 1532745,
      dept_name: 'Business Admin',
      line_manager: 'Marshal Benchfort',
      manager_user_id: 3433434,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1536907,
      dept_name: 'Software Engr',
      line_manager: 'Rose Querty',
      manager_user_id: 6749460,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('departments', null, {});
  }
};
