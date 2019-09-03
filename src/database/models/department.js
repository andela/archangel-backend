module.exports = (sequelize, DataTypes) => {
    const department = sequelize.define('department', {
        dept_name: DataTypes.TEXT,
        line_manager: DataTypes.TEXT,
        manager_staff_id: DataTypes.STRING
    }, { freezeTableName: true });

    return department;
};
