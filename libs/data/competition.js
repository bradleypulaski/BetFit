var db = require("../.././models");

function competitionDAO() {
    this.id;
    this.status;
    this.distance;
    this.fee;
    this.name;
    this.sex;
    this.weight_min;
    this.weight_max;
    this.age_min;
    this.age_max;
    this.start;
    this.end;
    this.active;
    this.ownerId;
    this.categoryId;
    this.updatedAt;
    this.createdAt;

    this.prize = async function () {
        var users = await this.getUsersByTime();
        var total = users.length;
        // var top = Math.floor(total * .15);

        var pool = await this.getBetsSum();
        var place = 1;
        var prizes = {'1': .35, '2': .28, '3': .21, '4': .16};
        while (top > 0) {
            var userId = users[top].userId;
            var winnings = prizes[place] * pool;
            db.competitionusers.update({
                winnings: winnings
            },
                {
                    where: { userId: userId }
                })
            place++;
            top--;
        }
    }

    this.calculatePrize = function (place, total, pool) {
      

        return prize;
    }

    this.getBetsSum = function () {
        var id = this.id
        return db.bet.sum({
            where: {
                competitionId: id
            }
        });
    }

    this.getBets = function () {
        var id = this.id
        return db.bet.findAll({
            where: {
                competitionId: id
            }
        });
    }

    this.delete = function () {
        var id = this.id
        return db.competition.destroy({
            where: {
                id: id
            }
        });
    }

    this.getAll = function () {
        return db.competition.findAll({

        });
    }

    this.getTop = function () {
        return db.competition.findAll({
            limit: 10,
            order: [["createdAt", "DESC"]]
        });
    }

    this.getOpen = function () {
        return db.competition.findAll({
            where: {
                status: "Open"
            },
            limit: 10,
            order: [["createdAt", "DESC"]]
        });
    }



    this.findById = function (id) {
        var competition = this;
        return db.competition.findOne({ where: { id: id } });
    }

    this.map = function (object) {
        for (var key in object) {
            this[key] = object[key];
        }
    }

    this.forceAddUser = function (userId) {
        var competitionId = this.id;
        return db.competitionusers.create({
            competitionId: competitionId,
            userId: userId
        });
    }

    this.addUser = function (userId, cb) {
        var age_min = this.age_min;
        var age_max = this.age_max;
        var weight_min = this.weight_min;
        var weight_max = this.weight_max;
        var sex = this.sex;
        var competitionId = this.id;
        db.user.findOne({ where: { id: userId } }).then(function (result) {
            if (result.sex = sex) {
                if (result.weight < weight_max && result.weight > weight_min) {
                    if (result.age < age_max && result.weight > age_min) {
                        db.competitionusers.create({
                            competitionId: competitionId,
                            userId: userId
                        }).then(function (result) {
                            return cb(result);
                        });
                    } else {
                        return cb("age does not qualify");
                    }
                } else {
                    return cb("weight does not qualify");
                }
            } else {
                return cb("sex does not qualify");
            }
        });
    }

    this.insert = function () {
        var name = this.name;
        var status = this.status;
        var distance = this.distance;
        var fee = this.fee;
        var sex = this.sex;
        var weight_min = this.weight_min;
        var weight_max = this.weight_max;
        var age_min = this.age_min;
        var age_max = this.age_max;
        var start = this.start;
        var end = this.end;
        var active = 1;
        var ownerId = this.ownerId;
        var categoryId = this.categoryId;

        return db.competition.create({
            name: name,
            status: status,
            distance: distance,
            fee: fee,
            sex: sex,
            weight_min: weight_min,
            weight_max: weight_max,
            age_min: age_min,
            age_max: age_max,
            start: start,
            end: end,
            active: active,
            ownerId: ownerId,
            categoryId: categoryId
        });
    }

    this.getCompetition = function (id) {
        return db.competition.findOne({
            where: {
                id: id
            }
        });
    }

    this.getUsers = function () {
        var id = this.id;
        return db.competitionusers.findAll(
            {
                where: { competitionId: id },
                include: [{ model: db.user, as: 'user' }]
            }
        );
    }

    this.dropUser = function (userId) {
        var id = this.id;
        return db.competitionusers.destroy(
            {
                where: { userId: userId },
             }
        );
    }
    this.getUsersByTime = function () {
        var id = this.id;
        return db.competitionusers.find(
            {
                order: [["time", "ASC"]],
                where: { competitionId: id },
                limit: 4,
                include: [{ model: db.user, as: 'user' }]
            }
        );
    }
    this.getTopUsers = function () {
        var id = this.id;
        return db.competitionusers.find(
            {
                limit: 5,
                order: [["time", "ASC"]],
                where: { competitionId: id },
                include: [{ model: db.user, as: 'user' }]
            }
        );
    }

    this.getCategories = function (cb) {
        return db.competitioncategory.findAll(
            {
            }
        );
    }

    this.getChat = function () {
        var id = this.id;
        return db.competitionchat.findAll(
            {
                where: { competitionId: id },
                include: [{ model: db.user, as: "user", required: false }],
                group: ['id']
            }
        );
    }

    this.sendMessage = function (userId, message) {
        var competitionId = this.id;

        return db.competitionchat.create({
            userId: userId,
            competitionId: competitionId,
            message: message
        });
    }

    this.getCategoryName = function () {
        var id = this.categoryId;
        return db.competitioncategory.find(
            {
                where: { id: id }
            }
        );
    }

    this.createCategory = function (name) {
        return db.competitioncategory.create({ name: name });
    }

    this.privilegeCheck = function (userId) {
        var competitionId = this.id;
        return db.competitionusers.findOne({ where: { competitionId: competitionId, userId: userId } });
    }

    this.setBet = function (userId, item, value, is_collaterol, cb) {
        db.competitionusers.findOne({
            where: {
                userId: userId
            }
        }).then(function (result) {
            var id = result.id;
            db.bet.create({
                competitionusersId: id,
                item: item,
                value: value,
                is_collaterol: is_collaterol
            }).then(function (result) {
                cb(result);
            });
        });
    }
}

var competitionDAO = new competitionDAO();
module.exports = competitionDAO;