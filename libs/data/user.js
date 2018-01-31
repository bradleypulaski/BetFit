var sha512 = require("../utilities/sha512.js");
var db = require("../.././models");
var fs = require("fs");

function userDAO() {
    this.id,
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

    this.setAvatar = function(id, path, cb) {
        db.user.update({
            avatar: path
        }, {
            where: {
                id: id
            }
        }).then(function(result){
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

    this.register = function (cb) {
        var hash = sha512(this.password);
        var username = this.username;
        var email = this.email;
        var first_name = this.first_name;
        var last_name = this.last_name;
        var bio = this.bio;
        var sex = this.sex;
        var age = this.age;
        var weight = this.weight;
        db.user.findOne( // check if username exists
            {
                where: {
                    username: username
                }
            }
        ).then(function (result) {
            if (result) { // if so throw error
             } else {
                db.user.findOne( // if not check email
                    {
                        where: {
                            email: email
                        }
                    }
                ).then(function (result) {
                    if (result) { // if email exists throw error
                        cb(false, "Email already exists!");
                     } else { // if not enter rexort
                        db.user.create({
                            username: username,
                            email: email,
                            password: hash,
                            first_name: first_name,
                            last_name: last_name,
                            bio: bio,
                            sex: sex,
                            age: age,
                            weight: weight
                        }).then(function (result) {
                            cb(result, false);
                        }).catch(function (error) {
                            throw error;
                        });
                    }
                }).catch(function (error) {
                    throw error;
                });
            }
        }).catch(function (error) {
            throw error;
        });
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
       },   { where: { id: id } }).then(function(result) {

       });
    }
}

var userDAO = new userDAO();
module.exports = userDAO;