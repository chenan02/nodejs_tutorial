var mongoose = require('mongoose');
var chatSchema = new mongoose.Schema({
  created: Date,
  content: String,
  username: String,
  room: String
});
module.exports = mongoose.model('Chat', chatSchema);

