module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('notifications', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        travel_id: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        line_manager_id: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        line_manager_email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        content: {
            allowNull: false,
            type: Sequelize.STRING
        },
        is_read: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }),
    down: (queryInterface) => queryInterface.dropTable('notifications')
};
