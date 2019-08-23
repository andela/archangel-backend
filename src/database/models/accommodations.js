export default (sequelize, DataTypes) => {

    const accommodations = sequelize.define('accommodations', {

        travel_id: DataTypes.INTEGER,

        location: DataTypes.TEXT,

        capacity: DataTypes.INTEGER,

        accommodation_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                msg: 'Please provide your accommodation\'s name'
            }
        },

    });


    return accommodations;
};