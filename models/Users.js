module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
        },
        theme: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lang: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Overviews, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Likes, {
            onDelete: "cascade"
        });

        Users.hasMany(models.UsersRating, {
            onDelete: "cascade"
        });
    };

    return Users;
};