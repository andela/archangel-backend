const { hashSync, genSaltSync } = require('bcryptjs');

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1674946,
          staff_id: 'ABD-111-8209',
          first_name: 'Peter',
          last_name: 'Chidi',
          email: 'petchidi@yahoo.com',
          password: hashSync('testing123', genSaltSync(10)),
          dept_id: 15327458,
          dob: '2019-08-09',
          gender: 'Male',
          address: 'Ok. This is my address',
          preferred_lang: 'English',
          preferred_currency: 'USD',
          role: 'processed',
          is_active: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1215739,
          staff_id: 'GHD-123-9004',
          first_name: 'Ngozi',
          last_name: 'Nancy',
          email: 'nancngo@gmail.com',
          password: hashSync('testing123', genSaltSync(10)),
          dept_id: 1536907,
          dob: '2015-08-09',
          gender: 'Female',
          address: 'Ok. This is our address',
          preferred_lang: 'English',
          preferred_currency: 'USD',
          role: 'processed',
          is_active: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};