import Sequelize from 'sequelize';

const sequelize = new Sequelize('barefoot', 'postgres', '1battalion', {
    dialect: 'postgres',
});

const models = {
    users: sequelize.import('./users'),
    departments: sequelize.import('./departments'),
    travels: sequelize.import('./travels'),
    accommodations: sequelize.import('./accommodations'),
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;