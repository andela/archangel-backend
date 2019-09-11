module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('notifications', [{
            id: 333,
            user_id: 1674946,
            travel_id: 1898451,
            line_manager_id: 6453673,
            line_manager_email: 'chidiebere_chukwuma@yahoo.com',
            is_read: false,
            content: 'Your travel request has been created',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 1627,
            user_id: 1215739,
            travel_id: 1891029,
            line_manager_id: 3640773,
            line_manager_email: 'chukschiboy@gmail.com',
            is_read: false,
            content: 'Your travel request has been created',
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {}),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('notifications', null, {})
};
