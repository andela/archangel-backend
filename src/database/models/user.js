export default (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
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

    User.associate = (models) => {
        User.belongsTo(models.department, {
            foreignKey: 'dept_id'
        });

        User.hasMany(models.travel, {
            foreignKey: 'user_id'
        });
    };
    return User;
};