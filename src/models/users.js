import { hashSync, genSaltSync } from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
    const salt = genSaltSync(10);
    const users = sequelize.define('users', {
        staff_id: DataTypes.STRING,
        first_name: DataTypes.TEXT,
        last_name: DataTypes.TEXT,
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
        dept_id: DataTypes.INTEGER,
        dob: DataTypes.DATE,
        gender: {
            type: DataTypes.ENUM('Male', 'Female')
        },
        address: DataTypes.TEXT,
        preferred_lang: DataTypes.TEXT,
        preferred_currency: DataTypes.TEXT,
        image: DataTypes.JSON,
        role: {
            type: DataTypes.ENUM(
                'super-admin',
                'travel-admin',
                'travel-team-member',
                'manager',
                'requester',
                'user'
            ),
            defaultValue: 'user'
        },
        is_active: DataTypes.BOOLEAN,
        emailNotify: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        appNotify: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {});

    users.associate = (models) => {
        users.belongsTo(models.departments, {
            foreignKey: 'dept_id'
        });

        users.hasMany(models.travel_requests, {
            foreignKey: 'user_id'
        });
    };
    users.beforeCreate((incomingUser) => {
        incomingUser.password = hashSync(incomingUser.password, salt);
    });

    return users;
};
