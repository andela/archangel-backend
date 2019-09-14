module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accommodation_feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accommodation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'accommodations',
          key: 'id',
          as: 'accommodation_id',
        },
      },
      accommodation_name: {
        type: Sequelize.TEXT,
      },
      feedback: {
        type: Sequelize.TEXT,
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
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('accommodation_feedbacks');
  }
};
