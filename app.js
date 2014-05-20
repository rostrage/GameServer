'use strict';
/**
 * Module dependencies.
 */

var express = require('express')
  , api = require('./api')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);


app.configure(function(){
  app.set('port', process.env.PORT || 3003);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io.sockets.on('connection', function(socket) { 
  console.log("Got new socket.io connection.");
  var session = {};
  socket.on('createAccount', api.createAccount.bind(null, socket, session));
  socket.on('login', api.login.bind(null, socket, session));
  socket.on('logout', api.logout.bind(socket, session));
  socket.on('addAsset', api.addAsset.bind(socket, session));
  socket.on('removeAsset', api.removeAsset.bind(socket, session));
  socket.on('joinWorld', api.joinWorld.bind(socket, session));
  socket.on('createWorld', api.createWorld.bind(socket, session));
  socket.on('leaveWorld', api.leaveWorld.bind(socket, session));
  socket.on('deleteWorld', api.deleteWorld.bind(socket, session));
  socket.on('addItem', api.addItem.bind(socket, session));
  socket.on('updateItem', api.updateItem.bind(socket, session));
  socket.on('deleteItem', api.addItem.bind(socket, session));
  socket.on('giveItem', api.addItem.bind(socket, session));
});
