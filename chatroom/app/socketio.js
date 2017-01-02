var socketio = require('socket.io'),
    mongoose = require('mongoose'),
    Chat = require('./models/chat');

module.exports.listen = function(app) {
  io = socketio.listen(app);
  
  io.on('connection', function(socket) {

    var defaultRoom = 'general';
    var rooms = ["general", "dogs", "cats"];

    socket.emit('setup', {
      rooms: rooms
    });

    socket.on('new user', function(data) {
      data.room = defaultRoom;
      io.in(defaultRoom).emit('user joined', data);
    });

    socket.on('switch room', function(data) {
      socket.leave(data.oldRoom);
      socket.join(data.newRoom);
      io.in(data.oldRoom).emit('user left', data);
      io.in(data.newRoom).emit('user joined', data);
    });

    socket.on('new message', function(data) {
      var newMsg = new Chat({
        username: data.username,
        content: data.message,
        room: data.room.toLowerCase(),
        created: new Date()
      });

      newMsg.save(function(err, msg) {
        io.in(msg.room).emit('message created', msg);
      });
    });
  });
  
  return io;
};
