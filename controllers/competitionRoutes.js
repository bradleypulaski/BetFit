var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
var competition = require("../libs/data/competition.js");


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var appDir = path.dirname(require.main.filename);



router.get("/competition/view/:id", async function (req, res) {
    var competitionId = req.params.id;
    var userId = req.session.user.id;

    var params = {
        title: "Competition",
        user: userId,
        userdata: req.session.user,
        competition: competitionId
    };

    var competitionobject = await competition.findById(competitionId);
    competition.map(competitionobject);
    var privilege = await competition.privilegeCheck(userId);

    if (!privilege) {
        // redirect
        res.json("not allowed");
    } else {
        params.users = await competition.getUsers();
        params.categoryname = await competition.getCategoryName();
        params.chat = await competition.getChat();
        res.render("competition/view", params);
    }
});


router.get("/competition/landing", async function (req, res) {
    var competitions = await competition.getTop();
    for (var key in competitions) {
        var id = competitions[key].id;
        competition.id = id;
        competitions[key].users = await competition.getTopUsers();
    }
    
    var params = {
        title: "Competitions",
        userdata: req.session.user,
        competitions: competitions
    };
    res.render("competition/landing", params);
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

router.get("/competition/delete/:id", async function (req, res) {
    var userId = req.session.user.id;
    var competitionobject = await competition.findById(req.params.id);
    competition.map(competitionobject);
    var owner = competition.ownerId;

    if (owner !== userId) {
        // redirect
        res.json("not allowed");
    } else {
        await competition.delete();
        // redirect to landingpage
    }
});

router.post("/competition/bet/:id", function(req, res){

});


module.exports = router;