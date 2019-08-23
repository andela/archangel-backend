export default (sequelize, DataTypes) => {

    const users = sequelize.define('users', {

        staff_id: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
            validate: {
                msg: 'Please provide your staff_id'
            },
        },

        first_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                msg: 'Please provide your First Name'
            }
        },

        last_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                msg: 'Please provide your Last Name'
            }
        },

        email: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
            validate: {
                msg: 'Please provide a valid email address'
            }
        },

        password: DataTypes.TEXT,

        dob: DataTypes.TEXT,

        gender: DataTypes.TEXT,

        address: DataTypes.TEXT,

        preferred_language: DataTypes.TEXT,

        preferred_currency: DataTypes.TEXT,

        role: DataTypes.TEXT,

        is_active: DataTypes.BOOLEAN,

        dept_id: DataTypes.INTEGER,

    });

    users.associate = (models) => {
        users.belongsTo(models.departments, {
            foreignKey: 'dept_id'
        });

        users.hasMany(models.travels, {
            foreignKey: 'user_id'
        });
    };

    return users;
};