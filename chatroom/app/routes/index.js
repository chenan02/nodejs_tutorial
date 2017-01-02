var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Chat = require('../models/chat');

/* GET home page. */
router.get('/', function(req, res){
  res.render('index');
});

router.post('/setup', function(req, res) {
  var chatData = {
    created: new Date(),
    content: 'Hi',
    username: 'solarflare37',
    room: 'hiroom'
  };
  chatData.save(function(err, savedChat) {
    console.log(savedChat);
  });
  res.send('created');
});

router.get('/chat', function(req, res) {
  Chat.find({
    'room': req.query.room.toLowerCase()
  }).exec(function(err, chats) {
    res.json(chats);
  })
});

module.exports = router;



