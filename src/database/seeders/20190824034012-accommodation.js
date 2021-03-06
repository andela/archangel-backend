module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('accommodations', [{
      id: 1653453,
      location: 'Paris, France',
      capacity: 3,
      accommodation_name: 'Sheraton Protea',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1332557,
      location: 'Toronto, Canada',
      capacity: 1,
      accommodation_name: 'PAR Towers',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('accommodations', null, {});
  }
};
