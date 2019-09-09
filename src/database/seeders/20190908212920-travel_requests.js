/* eslint-disable no-unused-vars */
/* eslint-disable import/no-dynamic-require */
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('travel_requests', [{
        id: 1898451,
        user_id: 1898451,
        travel_type: 'one-way',
        origin: 'New York, USA',
        destination: 'Paris, France',
        departure_date: new Date(),
        return_date: new Date(),
        travel_purpose: 'This is the reason for my travel',
        accommodation_id: 1653453,
        multi_city: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1891029,
        user_id: 1891029,
        travel_type: 'return',
        origin: 'Washington DC, USA',
        destination: 'Toronto, Canada',
        departure_date: new Date(),
        return_date: new Date(),
        travel_purpose: 'This is the most important reason for my travel',
        accommodation_id: 1653453,
        multi_city: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('travel_requests', null, {})
};
