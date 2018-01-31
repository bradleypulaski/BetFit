var express = require("express");
var db = require("./models");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 3001;
var cookieSession = require('cookie-session');
 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use("/public", express.static(__dirname + '/public'));
app.use("/uploads", express.static(__dirname + '/uploads'));

 
app.use(cookieSession({
  httpOnly: true, 
  maxAge: 30 * 60 * 1000,
  secure: false,
  overwrite: false,
  secret: 'keyboard cat'
}));


app.use(require("./controllers/userRoutes.js"));

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
  
 
