import { hashSync, genSaltSync } from 'bcryptjs';

export default (sequelize, DataTypes) => {
	const salt = genSaltSync(10);
	const users = sequelize.define(
		'users',
		{
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
			is_active: DataTypes.BOOLEAN,
		},
		{}
	);

	users.associate = (models) => {
		users.belongsTo(models.departments, {
			foreignKey: 'dept_id',
		});

		users.hasMany(models.travels, {
			foreignKey: 'user_id',
		});
	};
	users.beforeCreate((incomingUser) => {
		incomingUser.password = hashSync(incomingUser.password, salt);
	});

	return users;
};
