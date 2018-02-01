var db = require("../.././models");

function messageDAO() {
    this.user1Id;
    this.user2Id;
    this.message;
    this.edited;

    this.getMessages = function (user1Id, user2Id) {
        return db.message.findAll(
            {
                where: {
                    [Op.or]: [{ user1Id: user1Id, user2Id: user2Id }, { user1Id: user2Id, user2Id: user1Id }]
                }
            });
    }


    this.sendMessage = function (user1Id, user2Id, message) {
        return db.message.create({
            user1Id: user1Id,
        });
    }

    this.delete = function (id) {
        return db.message.destroy({ where: { id: id } });
    }

    this.edit = function (id, message) {
        return db.message.update({
            message: message,
            edited: 1
        }, { where: { id: id } });
    }


}

var messageDAO = new messageDAO();
module.exports = messageDAO;