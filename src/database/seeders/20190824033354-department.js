/* eslint-disable import/no-dynamic-require */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('departments', [{
                id: 15327458,
                dept_name: 'Business Admin',
                line_manager: 'Mr. Benchfort',
                manager_staff_id: 'GHJ-378-2838',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 1536907,
                dept_name: 'Software Engr',
                line_manager: 'Ms. Querty',
                manager_staff_id: 'RDS-256-5787',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('departments', null, {})
};
