module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('accommodations', [{
                id: 1653453,
                travel_id: 1940438,
                location: 'Paris, France',
                capacity: 3,
                accommodation_name: 'Sheraton Protea',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 13325578,
                travel_id: 14376327,
                location: 'Toronto, Canada',
                capacity: 1,
                accommodation_name: 'PAR Towers',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('accommodations', null, {});
    }
};