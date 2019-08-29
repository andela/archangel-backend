import { hashSync, genSaltSync } from 'bcrypt';

export default (sequelize, DataTypes) => {
    const salt = genSaltSync(10);
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
    user.beforeCreate((incomingUser) => {
        incomingUser.password = hashSync(incomingUser.password, salt);
    });

    return user;
};