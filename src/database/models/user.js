module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        staff_id: DataTypes.STRING,
        first_name: DataTypes.TEXT,
        last_name: DataTypes.TEXT,
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
        dept_id: DataTypes.INTEGER,
        dob: DataTypes.DATE,
        gender: DataTypes.TEXT,
        address: DataTypes.TEXT,
        preferred_lang: DataTypes.TEXT,
        preferred_currency: DataTypes.TEXT,
        role: DataTypes.TEXT,
        is_active: DataTypes.BOOLEAN
    }, {});

    user.associate = (models) => {
        user.belongsTo(models.department, {
            foreignKey: 'dept_id'
        });

        user.hasMany(models.travel, {
            foreignKey: 'user_id'
        });
    };
    return user;
};