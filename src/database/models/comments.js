export default (sequelize, DataTypes) => {
	const comment = sequelize.define('comments', {
        travel_id: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
        author_name: DataTypes.TEXT,
        author_email: DataTypes.TEXT,
    }, { freezeTableName: true });

	return comment;
};
