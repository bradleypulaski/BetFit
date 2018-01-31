module.exports = function (sequelize, DataTypes) {
    var userfriend = sequelize.define("userfriend", {

    });

    userfriend.associate = function (models) {
        models.userfriend.belongsTo(models.user, {
            as: "user1"
        });
        models.userfriend.belongsTo(models.user, {
            as: "user2"
        });
    }
    return userfriend;
};
