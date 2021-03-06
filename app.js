var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.VCAP_APP_PORT || 3000;
var pug = require('pug');
var session = require('express-session');
var sessionStore = require('connect-redis')(session);
var passportSocketIo = require("passport.socketio");
var cParse = require('cookie-parser');

//enable pug
app.set('view engine', 'pug');
//allow assets to be found
app.use(express.static(__dirname));

//routes
app.get('/', function(req, res){
  res.render('index.pug', {});
});

app.get('/login', function (req, res) {
  res.render('login.pug', {})
});

app.get('/register', function (req, res) {
  res.render('register.pug', {})
});

//connection && listen on port
io.on('connection', function(socket) {
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
  });
});

http.listen(port, function(){
    console.log('listening on *:3000');
});


