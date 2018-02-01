var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
var formidable = require('formidable');
var fs = require("fs");
var path = require('path');
var user = require("../libs/data/user");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var appDir = path.dirname(require.main.filename);

// router.use(function (req, resp, next) {
//     next();
// });
var competition = require("../libs/data/competition.js");



process.on('unhandledRejection', function (reason, p) { // moar reasons for unhandled rejections promises plz gibz me stack trace!
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
});



// ROUTES

router.get("/seeds", async function (req, res) {

    user.username = "brad";
    user.first_name = "Brad";
    user.last_name = "P";
    user.password = "hello";
    user.bio = "I am a bio";
    user.age = 27;
    user.weight = 279;
    user.email = "bradpulaski@gmail.com";
    user.sex = "Male";

    var userobject = await user.register();
    if (!userobject) {
        return res.json("Username or Email already exists!");
    }
    req.session.user = userobject;
    competition.name = "Test";
    competition.start = "1/30/2018";
    competition.end = "4/30/2018";
    competition.weight_min = 1;
    competition.weight_max = 1000;
    competition.age_min = 1;
    competition.age_max = 100;
    competition.sex = "Male";
    competition.active = 1;
    competition.ownerId = userobject.id;
    var category = await competition.createCategory("running");
    competition.categoryId = category.id;
    var comp = await competition.insert();
    competition.id = comp.id;
    competition.addUser(userobject.id, async function (result) {
        await competition.sendMessage(userobject.id, "first message");
        await competition.sendMessage(userobject.id, "second message");
        return res.json("success!");
    });
});


//  REAL ROUTES

router.get("/user/profile", function(req, res){
    var params = {
        userdata: req.session.user,
        title: "Profile"
    }
    res.render("user/profile", params);
});

router.get("/register", function(req, res){
    res.render("user/profile", {});
});
router.get("/login", function(req, res){
    res.render("user/login", {});
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
});




router.post("/register", async function (req, res) {
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

    var userobject = await user.register();

    if (!userobject) {
        return res.render( "user/login",  {error,"Username or Email already exists!"});
    }

    req.session.user = userobject;

    return res.redirect("/home");
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
    req.session.destroy(); // destroy session
});


module.exports = router;