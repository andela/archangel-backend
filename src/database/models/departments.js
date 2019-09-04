module.exports = (sequelize, DataTypes) => {
    const departments = sequelize.define('departments', {
        dept_name: DataTypes.TEXT,
        line_manager: DataTypes.TEXT,
        manager_staff_id: DataTypes.STRING,
        manager_email: DataTypes.TEXT
    }, {});

    departments.associate = (models) => {
        // associations can be defined here
        // departments.hasMany(models.notifications, {
        //     foreignKey: 'manager_email'
        // });
    };

    return departments;
};