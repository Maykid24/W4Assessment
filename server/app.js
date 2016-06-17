//Everything you need to connect to everything within your folders, making it easier
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var pg = require('pg');
var randomN = require('../modules/random');

var connectionString = 'postgres://localhost:5432/w4assessment';
//Allowing you to access public throughout your entire project
app.use(express.static('public'));
//Base url
app.get('/', function (req, res) {
  console.log('At base url');
  res.sendFile(path.resolve('views/index.html'));
});// End of get base url
//Creating new animals that come into the zoo
app.post('/createAnimal', urlencodedParser, function (req, res) {
  console.log('Create Animal: ' + req.body.animal + req.body.number);
  req.body.number = randomN(1, 100);
  pg.connect(connectionString, function (err, client, done) {
    client.query('INSERT INTO animal (type, count) VALUES ($1, $2)', [req.body.animal, req.body.number]);
  });//End of pg connect
});//End of createAnimal POST
//Allowing you to see the animals that you posted in
app.get('/getAnimals', function (req, res) {
  console.log('GetExample');
  var results = [];
  pg.connect(connectionString, function (err, client, done) {
    var animalQuery = client.query('SELECT * FROM animal ORDER BY id DESC');
    var rows =0;
    animalQuery.on('row', function (row) {
      results.push(row);
    });//end of animal query
    animalQuery.on('end', function () {
      return res.json(results);
    });//end of animal query end
  });//End of pg connectionString
});//End of get animals

//Delete an animal
app.post('/deleteAnimal', urlencodedParser, function (req, res) {
  var results = [];
  pg.connect(connectionString, function (err, client, done) {
    var query = client.query('DELETE FROM animal WHERE id = '+req.body.id+';');
    var rows = 0;
    query.on('row', function (row) {
      results.push(row);
    });//End of query on function
    query.on('end', function () {
      return res.json(results);
    });//end of query end function
  });//end of pg connect function
});//End of Delete Animal post
//spins up the server for you to actually see the data
app.listen(process.env.PORT || 3000, function () {
  console.log('Listening in on 3000');
});//End of app listen spin up of server
