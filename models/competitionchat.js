module.exports = function (sequelize, DataTypes) {
    var competitionchat = sequelize.define("competitionchat", {
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        edited: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    });

    competitionchat.associate = function(models) {
        models.competitionchat.belongsTo(models.user,{
            as:"user"
        });
        models.competitionchat.belongsTo(models.competition,{
            as:"competition"
        });
    }
    return competitionchat;
};
