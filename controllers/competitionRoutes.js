var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
var competition = require("../libs/data/competition.js");
var user = require("../libs/data/user.js");


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var appDir = path.dirname(require.main.filename);


router.get("/competition/enter/:id", async function (req, res) {
    var competitionId = req.params.id;
    competition.id = competitionId;
    var compobj = competition.findById(competitionId);
    await competition.map();

    competition.addUser(req.session.user.id, function (result) {
        if (!result) {
            req.session.error = "you do not have permission to go to this competition";
            return res.redirect("/competition/user");
        } else {
            res.redirect("/competition/view/" + competitionId);
        }
    });
});


router.get("/competition/leave/:id", async function (req, res) {
    var competitionId = req.params.id;
    competition.id = competitionId;
    await competition.dropUser(req.session.user.id);
    res.redirect("/competition/user");
});


router.get("/competition/view/:id", async function (req, res) {
    var competitionId = req.params.id;

    if (!req.session.user) {
        // redirect
        req.session.error = "you do not have permission to go to this competition";
        return res.redirect("/login");
    }
    var userId = req.session.user.id;

    var params = {
        title: "Competition",
        user: userId,
        userdata: req.session.user,
        competition: competitionId
    };

    if (req.session.error !== null && req.session.error !== false) {
        params.error = req.session.error;
        req.session.error = false;
    }
    competition.id = competitionId;
    var competitionobject = await competition.findById(competitionId);
    competition.map(competitionobject);
    var privilege = await competition.privilegeCheck(userId);

    if (!privilege) {
        // redirect
        req.session.error = "you do not have permission to go to this competition";
        return res.redirect("/competition/landing");
    } else {
        params.users = await competition.getUsers();
        params.categoryname = await competition.getCategoryName();
        params.chat = await competition.getChat();
        return res.render("competition/view", params);
    }
});


router.get("/competition/landing", async function (req, res) {
    user.id = req.session.user.id;
    var competitions = await user.getCompetitions();
    var open = await competition.getOpen();
    for (var key in competitions) {
        var id = competitions[key].id;
        competition.id = id;
        competitions[key].users = await competition.getTopUsers();
    }

    var params = {
        title: "Competitions",
        userdata: req.session.user,
        competitions: competitions,
        open: open
    };

    if (req.session.error !== null && req.session.error !== false) {
        params.error = req.session.error;
        req.session.error = false;
    }

    res.render("competition/landing", params);
});

router.get("/competition/user", async function (req, res) {
    user.id = req.session.user.id;
    var competitions = await user.getCompetitions();


    var params = {
        title: "Competitions",
        userdata: req.session.user,
        competitions: competitions
    };

    if (req.session.error !== null && req.session.error !== false) {
        params.error = req.session.error;
        req.session.error = false;
    }

    res.render("competition/user", params);
});

router.post("/competition/create", async function (req, res) {
    var data = req.body;
    data.ownerId = req.session.user.id;
    for (var key in data) {
        competition[key] = data[key];
    }
    var competitionobject = await competition.insert();
    competition.id = competitionobject.id;
    await competition.forceAddUser(req.session.user.id);
    res.redirect("/competition/view/" + competition.id);
});

router.get("/competition/create", async function (req, res) {
    var categories = await competition.getCategories();

    res.render("competition/create", { categories: categories });
});

router.get("/competition/delete/:id", async function (req, res) {
    var userId = req.session.user.id;
    var competitionobject = await competition.findById(req.params.id);
    competition.map(competitionobject);
    var owner = competition.ownerId;

    if (owner !== userId) {
        req.session.error = "you do not have permission to delete competition!";
        backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    }
    else {
        await competition.delete();
        backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    }
});

router.post("/competition/bet/:id", function (req, res) {

});


module.exports = router;