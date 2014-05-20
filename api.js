'use strict';
var bcrypt = require('bcrypt')
, db = require('mongojs')('GameServer', ['users', 'worlds', 'assets']);

module.exports = {
  //data should contain a user and pass property and nothing else
  createAccount : function(sock, sess, data) {
    //10 is the size of the randomly generated salt
    bcrypt.hash(data.pass, 10, function(err, hash) {
      if(err) {
        console.err(err);
        return;
      }
      var newUser = {
        'userName': data.user,
        'pass': hash,
      };
      db.collection('users').save(newUser);
    });
  },
  //data should contain a user and pass property and nothing else
  login : function(sock, sess, data) {
  },
  logout : function(sock, sess, data) {
  },
  addAsset : function(sock, sess, data) {
  },
  removeAsset : function(sock, sess, data) {
  },
  joinWorld : function(sock, sess, data) {
  },
  createWorld : function(sock, sess, data) {
  },
  deleteWorld : function(sock, sess, data) {
  },
  leaveWorld : function(sock, sess, data) {
  },
  addItem : function(sock, sess, data) {
  },
  updateItem : function(sock, sess, data) {
  },
  deleteItem : function(sock, sess, data) {
  },
  giveItem : function(sock, sess, data) {
  }
};
