module.exports = function (sequelize, DataTypes) {
    var competitioncategory = sequelize.define("competitioncategory", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return competitioncategory;
};
