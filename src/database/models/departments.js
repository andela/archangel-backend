module.exports = (sequelize, DataTypes) => {
    const departments = sequelize.define('departments', {
        dept_name: DataTypes.TEXT,
        line_manager: DataTypes.TEXT,
        line_manager_email: DataTypes.TEXT,
        line_manager_id: DataTypes.INTEGER,
        manager_staff_id: DataTypes.STRING,
    }, {});

    // departments.associate = (models) => {
    //     // associations can be defined here
    //     // departments.hasMany(models.notifications, {
    //     //     foreignKey: 'manager_email'
    //     // });
    // };

    return departments;
};