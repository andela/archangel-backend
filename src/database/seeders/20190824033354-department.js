module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('departments', [{
      id: 15327458,
      dept_name: 'Business Admin',
      line_manager: 'Mr. Benchfort',
      manager_staff_id: 'GHJ-378-2838',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1536907,
      dept_name: 'Software Engr',
      line_manager: 'Ms. Querty',
      manager_staff_id: 'RDS-256-5787',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('departments', null, {});
  }
};