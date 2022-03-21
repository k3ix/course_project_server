module.exports = (sequelize, DataTypes) => {
    const Overviews = sequelize.define("Overviews", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        group: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: DataTypes.STRING,
        },
        images: {
            type: DataTypes.STRING,
        },
        ownerUsername: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authorRating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Overviews.associate = (models) => {
        Overviews.hasMany(models.Likes, {
            onDelete: "cascade"
        });

        Overviews.hasMany(models.UsersRating, {
            onDelete: "cascade"
        });

        Overviews.hasMany(models.Comments, {
            onDelete: "cascade"
        })
    }

    return Overviews;
};