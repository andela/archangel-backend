import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

// eslint-disable-next-line max-len
const sequelize = new Sequelize(config.database, config.username, config.password, config);

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