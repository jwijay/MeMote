var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dayta');

var Dayta = require('./models/dayta');
var Question = require('./models/question');

//TODO: see if I need to set express static routes to www folder
// app.use(express.static(__dirname + '/../www'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/questions', function (req, res) {
  Question.find(function(err, questions) {
    if (err) throw err;
    console.log('questions',questions);
    res.json(questions);
  });
});

app.get('/api/dayta', function (req, res) {
  Dayta.find().sort('-date').exec(function(err, daytas) {
    if (err) throw err;
    console.log(daytas);

    res.json(daytas);
  });
});

app.post('/api/dayta', function (req, res) {
  // res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var mood = req.body.mood;
  var responses = req.body.responses;

  var newDayta = new Dayta(
  {
    date: new Date(),
    mood: mood,
    responses: responses
  });

  newDayta.save(function(err) {
    if (err) throw err;

    res.end();
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});