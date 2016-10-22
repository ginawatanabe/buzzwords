var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
var collection = [];
var score = 0;

//Buzzword Object Constructor
function buzzword(buzzWord, points, heard) {
  this.buzzWord = buzzWord;
  this.points = points;
  this.heard = heard;
}

var firstBuzz = new buzzword("um", 100, false);

collection.push(firstBuzz);

app.listen(3000);

app.get('/', function (req, res) {
  res.render('/index');
});

app.get('/buzzwords', function (req, res) {
  res.send(buzzwords);
});

app.post('/buzzwords', function (req, res) {
  //store req.body in variable buzz
    var buzz = req.body;

  if (buzz.heard === 'true') {
    score += Number(buzz.points);
    console.log(score);
  } else {
    score = score;
    console.log(score);
  }


//if it can push the new buzzword object in the array, return success
  if (collection.push(buzz)) {
    console.log(collection);
    return res.send({"success": true});
  } else {
    return res.send({"success": false});
  }
})

app.put('/buzzwords', function (req,res) {
  //variables for storing req.body and things to be updated
    var buzzChange = req.body;
    var buzzy = buzzChange.buzzWord;
    var newPoints = buzzChange.points;
    var heardIt = buzzChange.heard;

  if (heardIt === 'true') {
    score += Number(buzzChange.points);
    console.log(score);
  } else {
    score = score;
    console.log(score);
  }

//change buzzword's points and heard boolean
//lookup loop from stackoverflow
  var lookup = {};
  for (i = 0; i<collection.length; i++) {
    lookup[collection[i].buzzWord] = collection[i];
  }

  var changedPoints = lookup[buzzy].points = newPoints;
  var changedHeard = lookup[buzzy].heard = heardIt;

  if (changedPoints && changedHeard) {
    console.log(collection);
    return res.send({
      "success": true,
      newScore: newPoints
    });
  } else {
    return res.send({"success": false});
  }

})

app.delete('/buzzwords', function(req, res) {
  var buzzChange = req.body;
  var buzzy = buzzChange.buzzWord;

  var lookup = {};
  for (i = 0; i<collection.length; i++) {
    lookup[collection[i].buzzWord] = collection[i];
  }

//update score
  if (buzzChange.heard === 'true') {
    score = score - Number(buzzChange.points);
    console.log(score);
  } else {
    score = score;
    console.log(score);
  }

//remove buzzword from collection
  for (i=0; i<collection.length; i++) {
    var obj = collection[i];
    if (collection[i].buzzWord === buzzy) {
      collection.splice(i, 1);
      console.log(collection);
      return res.send({"success":true});
    } else {
      return res.send({"success":false})
    }
  }

})

app.post('/reset', function(req,res) {
  score = 0;
  console.log(score);

  if (collection.splice(0, collection.length)) {
    console.log(collection);
    return res.send({"success": true});
  } else {
    return res.send({"success": false});
  }

})
