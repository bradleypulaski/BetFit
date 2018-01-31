var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
var user = require("../libs/data/user.js");
var formidable = require('formidable');
var fs = require("fs");
var path = require('path');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var appDir = path.dirname(require.main.filename);

// router.use(function (req, resp, next) {
//     next();
// });



// ROUTES

router.get("/login", function (req, res) {
    user.username = "brad";
    user.first_name = "Brad";
    user.last_name = "P";
    user.password = "hello";
    user.bio = "I am a bio";
    user.age = 27;
    user.weight = 279;
    user.email = "bradpulaski@gmail.com";
    user.sex = "Male";
    user.register(function (result) {
        return res.json("success");
    });
});

router.post("/login", function (req, res) {
    var data = req.body;
    user.username = data.username;
    var password = data.password;
    user.login(password, function (result, error) {
        if (!error) {
            req.session.user = result;
            return res.json(req.session);
        } else {
            return res.json(error);
        }
    });
});

router.post("/user/avatar", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var ex = path.extname(oldpath);
        if (ex !== ".jpg" && ex !== ".png") {
            return res.json("please upload a jpeg or png image!");
        }
        var newpath = __dirname + "../uploads/avatars" + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            user.setAvatar(req.session.user.id, newpath, function (result, error) {
                if (!error) {
                   return res.json("upload successful");
                }
            });
        });
    });

    router.post("/register", function (req, res) {
        var data = req.body;
        user.username = data.username;
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.password = data.password;
        user.bio = data.bio;
        user.age = data.age;
        user.weight = data.weight;
        user.email = data.email;
        user.sex = data.sex;
        user.register(function (result, error) {
            if (!error) {
                req.session.user = result;
                return res.json(req.session);
            } else {
                return res.json(error);
            }
        });
    });

    router.post("/user/update", function (req, res) {
        var data = req.body;
        var id = req.session.user.id;
        user.username = data.username;
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.password = data.password;
        user.bio = data.bio;
        user.age = data.age;
        user.weight = data.weight;
        user.email = data.email;
        user.sex = data.sex;
        user.update(id, function (result, error) {
            if (!error) {
                req.session.user = result;
                return res.json(req.session);
            } else {
                return res.json(error);
            }
        });
    });

    router.post("/logout", function (req, res) {
        req._destroy(); // destroy session
    });


    module.exports = router;