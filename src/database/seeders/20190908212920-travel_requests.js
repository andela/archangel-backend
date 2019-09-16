module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('travel_requests', [{
                id: 1898451,
                user_id: 1215739,
                travel_type: 'one-way',
                origin: 'New York, USA',
                destination: 'Paris, France',
                departure_date: new Date(),
                return_date: new Date(),
                travel_purpose: 'This is the reason for my travel',
                accommodation_id: 1653453,
                dept_id: 1536907,
                multi_city: false,
                createdAt: new Date() || '2019-08-15',
                updatedAt: new Date()
            },
            {
                id: 1891029,
                user_id: 1215739,
                travel_type: 'return',
                origin: 'Washington DC, USA',
                destination: 'Toronto, Canada',
                departure_date: new Date(),
                return_date: new Date(),
                travel_purpose: 'This is the most important reason for my travel',
                accommodation_id: 1653453,
                dept_id: 1536907,
                multi_city: true,
                createdAt: new Date() || '2019-06-17',
                updatedAt: new Date()
            }
        ], {});
    },

    down: function down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('travel_requests', null, {});
    }
};