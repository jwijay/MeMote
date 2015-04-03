var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var daytaSchema = new Schema({
  date: { 
    type: Date,
    default: Date.now
  },
  mood: Number,
  responses: Object
});

module.exports = mongoose.model('Dayta', daytaSchema);