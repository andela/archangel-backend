module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('departments', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        dept_name: {
            type: Sequelize.TEXT
        },
        line_manager: {
            type: Sequelize.TEXT
        },
        manager_staff_id: {
            type: Sequelize.STRING
        },
        line_manager_email: {
            type: Sequelize.TEXT
        },
        line_manager_id: {
            type: Sequelize.INTEGER
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('departments')
};
