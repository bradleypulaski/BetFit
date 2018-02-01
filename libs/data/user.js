var sha512 = require("../utilities/sha512.js");
var db = require("../.././models");
var fs = require("fs");

function userDAO() {
    this.id;
    this.username;
    this.email;
    this.password;
    this.first_name;
    this.last_name;
    this.bio;
    this.sex;
    this.age;
    this.weight;
    this.avatar;

    // MEMBERS

    this.setAvatar = function (id, path, cb) {
        db.user.update({
            avatar: path
        }, {
                where: {
                    id: id
                }
            }).then(function (result) {
                cb(result);
            });
    }

    this.login = function (password, cb) {
        var hash = sha512(password);
        var username = this.username;
        db.user.findOne(
            {
                where: {
                    username: username,
                    password: hash
                }
            }
        ).then(function (result) {
            if (result) {
                cb(result, false);
            } else {
                cb(false, "Username or Password does not match! Please try again!");
            }
        });
    }

    this.findByEmail = function (email) {
        return db.user.findOne(
            {
                where: {
                    email: email
                }
            }
        );
    }

    this.findByUsername = function (username) {
        return db.user.findOne(
            {
                where: {
                    username: username
                }
            }
        );
    }

    this.register =  async function () {
        var username = this.username;
        var email = this.email;
        var first_name = this.first_name;
        var last_name = this.last_name;
        var bio = this.bio;
        var sex = this.sex;
        var age = this.age;
        var weight = this.weight;

        var emailExists = await this.findByEmail(email);
        var usernameExists = await this.findByUsername(username);

        if (!emailExists && !usernameExists) {
            var hash = sha512(this.password);
            return  db.user.create({
                username: username,
                email: email,
                password: hash,
                first_name: first_name,
                last_name: last_name,
                bio: bio,
                sex: sex,
                age: age,
                weight: weight,
                avatar: null
            });
        } else {
           return new Promise(resolve => false);
        }
    }


    this.update = function (id, cb) {
        var username = this.username;
        var email = this.email;
        var first_name = this.first_name;
        var last_name = this.last_name;
        var bio = this.bio;
        var sex = this.sex;
        var age = this.age;
        var weight = this.weight;
        db.user.update({
            usermame: username,
            email: email,
            first_name: first_name,
            last_name: last_name,
            bio: bio,
            sex: sex,
            age: age,
            weight: weight
        }, { where: { id: id } }).then(function (result) {

        });
    }
}

var userDAO = new userDAO();
module.exports = userDAO;