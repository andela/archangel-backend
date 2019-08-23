export default (sequelize, DataTypes) => {

    const departments = sequelize.define('departments', {

        dept_name: DataTypes.TEXT,

        manager_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                msg: 'Please provide your name (manager)'
            }
        },

        manager_staff_id: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
            validate: {
                msg: 'Please provide your Staff ID'
            }
        }
    });

    // departments.associate = (models) => {
    //     // departments.belongsTo(models.users, {
    //     //     foreignKey: 'dept_id'
    //     // });

    //     //     // departments.belongsToMany(models.travels, {
    //     //     //     foreignKey: 'user_id'
    //     //     // });
    // };

    return departments;
};