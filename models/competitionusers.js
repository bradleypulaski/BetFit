module.exports = function (sequelize, DataTypes) {
    var competitionusers = sequelize.define("competitionusers", {
        time: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        isbet: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
        winnings: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.00
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
