module.exports = function (sequelize, DataTypes) {
    var competition = sequelize.define("competition", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        distance: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        fee: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        weight_min: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        weight_max: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sex: {
            type: DataTypes.ENUM,
            values: ["Male", "Female"]
        },
        status: {
            type: DataTypes.ENUM,
            values: ["Open", "Closed"]
        },
        age_min: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        age_max: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false
        },
        active: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    });

    competition.associate = function(models) {
        models.competition.belongsTo(models.competitioncategory,{
            as:"category"
        });
        models.competition.belongsTo(models.user,{
            as:"owner"
        });
    }
    return competition;
};
