module.exports = (sequelize, DataTypes) => {
    const departments = sequelize.define('departments', {
        dept_name: DataTypes.TEXT,
        line_manager: DataTypes.TEXT,
        manager_staff_id: DataTypes.STRING
    }, {});

    departments.associate = (models) => {
        departments.hasMany(models.users, {
          foreignKey: 'dept_id',
        });
      };

    return departments;
};