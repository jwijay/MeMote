var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionSchema = new Schema({
  title: String,
  order: Number
});

module.exports = mongoose.model('Question', questionSchema);