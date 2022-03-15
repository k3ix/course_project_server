module.exports = (sequelize, DataTypes) => {
    const UsersRating = sequelize.define("UsersRating", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return UsersRating;
};