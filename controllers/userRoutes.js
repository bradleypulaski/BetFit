var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
var formidable = require('formidable');
var fs = require("fs");
var path = require('path');
var user = require("../libs/data/user");
var sha512 = require("../libs/utilities/sha512.js");
const busboy = require('connect-busboy');

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


router.get("/pass", function (req, res) {
    res.json(sha512("hello"));
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

router.get("/user/profile", function (req, res) {
    var params = {
        userdata: req.session.user,
        title: "Profile"
    }
    if (req.session.error !== null && req.session.error !== false) {
        params.error = req.session.error;
        req.session.error = false;
    }

    res.render("user/profile", params);
});

router.get("/register", function (req, res) {
    res.render("user/register", {});
});

router.get("/login", function (req, res) {
    params = {
        title: "Login"
    };
    if (req.session.error !== null && req.session.error !== false) {
        params.error = req.session.error;
        req.session.error = false;
    }

    res.render("user/login", params);
});

router.post("/login", function (req, res) {
    var data = req.body;
    user.username = data.username;
    var password = data.password;
    user.login(password, function (result, error) {
        if (!error) {
            req.session.user = result;
            res.redirect("/competition/landing");
        } else {
            req.session.error = "Login Error, Username or Password does not match! Please Try again!";
            backURL = req.header('Referer') || '/';
            res.redirect(backURL);
        }
    });
});

router.post("/user/avatar", async function (req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream(__dirname + '/../uploads/avatars/' + filename);

        file.pipe(fstream);
        fstream.on('close', function () {
            var dir = '../uploads/avatars/' + filename;
            user.id = req.session.user.id;
            user.setAvatar(user.id, dir, function (result) {
                res.redirect('back');
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
        return res.render("user/register", { error: "Username or Email already exists!" });
    }

    req.session.user = userobject;

    return res.redirect("/competition/landing");
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

router.get("/logout", function (req, res) {
    req.session = null; // destroy session
    res.redirect("/login");
});


module.exports = router;