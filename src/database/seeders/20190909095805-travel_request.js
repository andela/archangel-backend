'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('travel_requests', [{
        user_id: 1,
        travel_type: 'return',
        origin: 'New York, USA',
        destination: 'Paris, France',
        departure_date: new Date(),
        return_date: new Date(),
        travel_purpose: 'This is the reason for my travel',
        accommodation_id: 1,
        multi_city: false,
      },
      {
        user_id: 1,
        travel_type: 'return',
        origin: 'Washington DC, USA',
        destination: 'Toronto, Canada',
        departure_date: new Date(),
        return_date: new Date(),
        travel_purpose: 'This is the most important reason for my travel',
        accommodation_id: 1,
        multi_city: false
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('travel_requests', null, {});
  }
};
