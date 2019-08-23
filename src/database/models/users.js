export default (sequelize, DataTypes) => {

    const users = sequelize.define('users', {

        staff_id: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: true,
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

        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                msg: 'Please provide a password'
            }
        },

        dob: {
            type: DataTypes.TEXT
        },

        gender: {
            type: DataTypes.TEXT,
        },

        address: {
            type: DataTypes.TEXT,
        },

        preferred_language: {
            type: DataTypes.TEXT,
        },

        preferred_currency: {
            type: DataTypes.TEXT,
        },

        role: {
            type: DataTypes.TEXT,
        },

        is_active: {
            type: DataTypes.BOOLEAN,
        },

        dept_id: {
            type: DataTypes.INTEGER,
        },

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