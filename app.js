'use strict';
/**
 * Module dependencies.
 */

var express = require('express')
  , favicon = require('serve-favicon')
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , errorHandler = require('errorhandler')
  , api = require('./api')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);


  app.set('port', process.env.PORT || 3003);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());
  if(!process.env.NODE_ENV || process.env.NODE_ENV=='development') { 
    app.use(errorHandler());
  }

app.get('/', routes.index);
app.get('/users', user.list);
app.use(express.static(path.join(__dirname, 'public')));
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io.sockets.on('connection', function(socket) { 
  console.log("Got new socket.io connection.");
  var session = {};
  socket.on('createAccount', api.createAccount.bind(null, socket, session));
  socket.on('login', api.login.bind(null, socket, session));
  socket.on('logout', api.logout.bind(null, socket, session));
  socket.on('addAsset', api.addAsset.bind(null, socket, session));
  socket.on('removeAsset', api.removeAsset.bind(null, socket, session));
  socket.on('joinWorld', api.joinWorld.bind(null, socket, session));
  socket.on('createWorld', api.createWorld.bind(null, socket, session));
  socket.on('leaveWorld', api.leaveWorld.bind(null, socket, session));
  socket.on('deleteWorld', api.deleteWorld.bind(null, socket, session));
  socket.on('addItem', api.addItem.bind(null, socket, session));
  socket.on('updateItem', api.updateItem.bind(null, socket, session));
  socket.on('deleteItem', api.addItem.bind(null, socket, session));
  socket.on('giveItem', api.addItem.bind(null, socket, session));
});
