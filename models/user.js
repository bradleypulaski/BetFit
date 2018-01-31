module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define("user", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sex: {
            type: DataTypes.ENUM,
            values: ["Male", "Female"]
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });
    return user;
};
