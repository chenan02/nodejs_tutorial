var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/chatroom_db");

var Chat = require('./chat');

var newChat = Chat({
  username: "andrew",
  content: "yoyoyo",
  room: "dogs",
  date: new Date()
});

newChat.save(function(err) {
  if (err) throw err;
  console.log("saved succ");
});
