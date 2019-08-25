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
