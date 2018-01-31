module.exports = function (sequelize, DataTypes) {
    var message = sequelize.define("message", {
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        edited: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    });

    message.associate = function(models) {
        models.message.belongsTo(models.user,{
            as:"from"
        });
        models.message.belongsTo(models.user,{
            as:"to"
        });
    }
    return message;
};
