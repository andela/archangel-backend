/* eslint-disable arrow-body-style */
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('comments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			travel_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'travel',
					key: 'id',
					as: 'travel_id',
				},
			},
			comment: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			author_name: {
				type: Sequelize.TEXT,
			},
			author_email: {
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
	down: (queryInterface) => {
		return queryInterface.dropTable('comments');
	},
};
