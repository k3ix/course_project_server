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
        }
    });

    return Users;
};