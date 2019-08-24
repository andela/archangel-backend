<<<<<<< HEAD
    import { hashSync, genSaltSync } from 'bcrypt';

    export default (sequelize, DataTypes) => {
        const salt = genSaltSync(10);
        const users = sequelize.define('users', {
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

        users.associate = (models) => {
            users.belongsTo(models.department, {
                foreignKey: 'dept_id'
            });

            users.hasMany(models.travel, {
                foreignKey: 'user_id'
            });
        };
        users.beforeCreate((incomingUser) => {
            incomingUser.password = hashSync(incomingUser.password, salt);
        });

        return users;
    };
=======
import { hashSync, genSaltSync } from 'bcrypt';

const salt = genSaltSync(parseInt(process.env.GEN_SALT_ROUND));

export default (Sequelize, Datatypes) => {
	const User = Sequelize.define('User', {}, {});

	//This function will hash the password before it is stored in the database...
	User.beforeCreate ((user) => {
		user.password = hashSync(user.password, salt);
	});

	return User;
}
>>>>>>> ft(user-signin):implement email and password user authentication
