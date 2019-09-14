module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.createTable('accommodations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            location: {
                type: Sequelize.TEXT
            },
            capacity: {
                type: Sequelize.INTEGER
            },
            accommodation_name: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    msg: 'Please provide your accommodation\'s name'
                }
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: function down(queryInterface, Sequelize) {
        return queryInterface.dropTable('accommodations');
    }
};
