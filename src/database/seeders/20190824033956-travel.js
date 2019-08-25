module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('travel', [{
                id: 1898451,
                user_id: 1674946,
                origin: 'New York, USA',
                destination: 'Paris, France',
                departure_date: new Date(),
                return_date: new Date(),
                travel_purpose: 'This is the reason for my travel',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 1891029,
                user_id: 1215739,
                origin: 'Washington DC, USA',
                destination: 'Toronto, Canada',
                departure_date: new Date(),
                return_date: new Date(),
                travel_purpose: 'This is the most important reason for my travel',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('travel', null, {});
    }
};