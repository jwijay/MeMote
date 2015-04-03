var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dayta');

var Dayta = require('./models/dayta');
var Question = require('./models/question');

//TODO: see if I need to set express static routes to www folder
// app.use(express.static(__dirname + '/../www'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/questions', function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  
  Question.find(function(err, questions) {
    if (err) throw err;
    console.log('questions',questions);
    res.json(questions);
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});