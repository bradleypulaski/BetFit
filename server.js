var express = require("express");
var db = require("./models");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 3001;
var cookieSession = require('cookie-session');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var competition = require("./libs/data/competition.js");

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1', 'room2', 'room3'];
// Handle connection
io.sockets.on('connection', function (socket) {
  console.log("Connected succesfully to the socket ...");


  socket.on('adduser', function (username) {
    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    socket.room = 'room1';
    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join('room1');
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'room1');
  });

  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (competitionId, userId, data) {
    var message = data;
    competition.id = competitionId;
    competition.addChat(userId, message, function (result) {

    });

    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.in(socket.room).emit('updatechat', socket.username, message);
  });

  socket.on('switchRoom', function (newroom) {
    // leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, received as function parameter
    socket.join(newroom);
    // update socket session room title
    socket.room = newroom;
    socket.emit('updaterooms', rooms, newroom);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });
});


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
app.use(require("./controllers/competitionRoutes.js"));

app.get("/", function (req, res) {
  res.redirect("/login");
});

db.sequelize.sync({ force: true }).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});


