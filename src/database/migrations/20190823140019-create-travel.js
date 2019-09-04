module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('travels', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
			},
			origin: {
				type: Sequelize.TEXT,
			},
			destination: {
				type: Sequelize.TEXT,
			},
			departure_date: {
				type: Sequelize.DATE,
			},
			return_date: {
				type: Sequelize.DATE,
			},
			travel_purpose: {
				type: Sequelize.TEXT,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		}),
	down: (queryInterface) => queryInterface.dropTable('travels'),
};
