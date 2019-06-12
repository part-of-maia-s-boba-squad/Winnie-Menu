require('newrelic');

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var React = require('react');
// var Application = require('../client/src/components/App.jsx');
var reactServer = require('react-dom/server');
var cors = require('cors');

// var db = require('./db/mongo.js');
var db = require('./db/psqlController.js');

// var HTMLtemplate = require(path.join(__dirname, '../client/src/template.js'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/dist'))); // this line becomes useless as we serve the template

app.get('/restaurant/:id', function (req, res) {
  res.header("X-Content-Type", "text/javascript");
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
});

// MONGO:
// app.get('/API/restaurant/:id', function (req, res) {
//   // var q = req.params.name;
//   var q = req.params.id;
//   console.log('query ID', q)

//   db.res(q, (err, data) => {
//     if (err) {
//       res.sendStatus(505);
//     } else {
//       data = data[0];
//       res.send(JSON.stringify(data));
//     }
//   });

// });

app.get('/API/restaurant/:id', function (req, res) {
  var q = req.params.id;
  console.log('query ID', q)
  db.getResData(q, (err, result) => {
    if (err) {
      res.sendStatus(500);
    }
    res.status(200).send(result);
  });
});

app.post('/API/restaurant', (req, res) => {
  db.postResData((err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('New restaurant has been posted');
    }
  });
});

app.put('/API/restaurant/:id', (req, res) => {
  var q = req.params.id;
  db.updateResData(q, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(`restaurant #${q} has been updated`);
    }
  });
});

app.delete('/API/restaurant/:id', (req, res) => {
  var q = req.params.id;
  db.deleteResData(q, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(`restaurant #${q} has been deleted`);
    }
  });
});


app.listen(3003, function () {
  console.log('listening on port 3003!');
});

