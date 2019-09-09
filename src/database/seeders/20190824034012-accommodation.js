/* eslint-disable no-unused-vars */
/* eslint-disable import/no-dynamic-require */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('accommodations', [{
                id: 1653453,
                location: 'Paris, France',
                capacity: 3,
                accommodation_name: 'Sheraton Protea',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 13325578,
                location: 'Toronto, Canada',
                capacity: 1,
                accommodation_name: 'PAR Towers',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('accommodations', null, {})
};
