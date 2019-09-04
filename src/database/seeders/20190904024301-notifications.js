module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('notifications', [{
                id: 333,
                travel_id: 1378,
                read_status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 1627,
                travel_id: 1573,
                read_status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('notifications', null, {});
    }
};