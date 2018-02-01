module.exports = function (sequelize, DataTypes) {
    var competitionusers = sequelize.define("competitionusers", {
        time: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        distance: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    });

    competitionusers.associate = function (models) {
        models.competitionusers.belongsTo(models.competition, {
            as: "competition"
        });
        models.competitionusers.belongsTo(models.user, {
            as: "user"
        });
    }
    return competitionusers;
};
