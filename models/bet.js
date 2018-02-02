module.exports = function (sequelize, DataTypes) {
    var bet = sequelize.define("bet", {
        item: {
            type: DataTypes.STRING,
            allowNull: true
        },
        value: {
            type: DataTypes.DOUBLE,
            validate: {
                isFloat() {
                    if (parseFloat(this.value) == "NaN") {
                        throw new Error("Please enter a Number!");
                    }
                }
            },
            defaultValue: 0.00
        },
        is_collaterol: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },

    });

    bet.association = function (models) {
        models.bet.belongsTo(models.competitionusers, {
            as: "competitionusers"
        });
        models.bet.belongsTo(models.competition, {
            as: "competition"
        });
    }
    return bet;
};
