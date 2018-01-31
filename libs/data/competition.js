var db = require("../.././models");

function competitionDAO() {
    this.id;
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

    this.delete = function(id, cb) {
        db.competition.destroy({
            where: {
                id: id
            }
        }).then(function(result) {
            cb(result);
        });
    }

    this.insert = function (cb) {
        var name = this.name;
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

        db.competition.create({
            name: name,
            sex:sex,
            weight_min: weight_min,
            weight_max: weight_max,
            age_min: age_min,
            age_max: age_max,
            start: start,
            end: end,
            active: active,
            ownerId: ownerId,
            categoryId: categoryId
        }).then(function(result){
            cb(result);
        });
    }

    this.getCompetition = function(id, cb) {
        db.competition.findOne({
            where: {
                id: id
            }
        }).then(function(result){
            if (!result) {
                cb(false, "No Competition Found!");
            } else {
                cb(result, false);
            }
        });
    }

    this.getUsers = function (cb) {
        var id = this.id;
        db.competition.find(
            {
                where: ['competition.id = ?', id],
                include: [db.user, db.competitionusers]
            }
        ).then(function (result) {
            console.log(result);
            cb(result);
        });
    }

    this.getCategories = function (cb) {
        db.competitioncategory.findAll(
            {
            }
        ).then(function (result) {
            console.log(result);
            cb(result);
        });
    }

    this.getCategoryName = function () {
        var id = this.categoryId;
        db.competition.find(
            {
                where: ['competition.categoryId = ?', id],
                include: [db.competitioncategory]
            }
        ).then(function (result) {
            console.log(result);
            cb(result.name);
        });
    }


    this.setBet = function(userId, item, value, is_collaterol, cb) {
        db.competitionusers.findOne({
            where: {
                userId: userId
            }
        }).then(function(result){
            var id = result.id;
            db.bet.create({
                competitionusersId: id,
                item: item,
                value: value,
                is_collaterol: is_collaterol
            }).then(function(result){
                cb(result);
            }); 
        });
    }
}

var competitionDAO = new competitionDAO();
module.exports = competitionDAO;