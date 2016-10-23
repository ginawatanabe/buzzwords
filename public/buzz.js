var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

//Collection of buzzword objects.
var collection = [];

//Score.
var score = 0;

//Buzzword Object Constructor.
function buzzword(buzzWord, points, heard) {
  this.buzzWord = buzzWord;
  this.points = points;
  this.heard = heard;
}

//Initial Buzzword Object.
var firstBuzz = new buzzword("um", 100, false);
collection.push(firstBuzz);

//Listen on Port 3000.
app.listen(3000);

//Get route to render index file.
app.get('/', function (req, res) {
  res.render('/index');
});

//Get route to send the initial buzzword.
app.get('/buzzwords', function (req, res) {
  res.send(firstBuzz);
});

//Post route to post new buzzwords.
app.post('/buzzwords', function (req, res) {
  var buzz = req.body;

  //Update score.
  if (buzz.heard === 'true') {
    score += Number(buzz.points);
    console.log(score);
  } else {
    score = score;
    console.log(score);
  }


  //If it can push the new buzzword object into the array, return success.
  if (collection.push(buzz)) {
    console.log(collection);
    return res.send({"success": true});
  } else {
    return res.send({"success": false});
  }
})

//Put route to update buzzwords.
app.put('/buzzwords', function (req,res) {
  //Variables for storing req.body and things to be updated.
  var buzzChange = req.body;
  var buzzy = buzzChange.buzzWord;
  var newPoints = buzzChange.points;
  var heardIt = buzzChange.heard;

  //Update score.
  if (heardIt === 'true') {
    score += Number(buzzChange.points);
    console.log(score);
  } else {
    score = score;
    console.log(score);
  }

  //Change buzzword's points and heard boolean
  //Lookup loop from stackoverflow
  var lookup = {};
  for (i = 0; i<collection.length; i++) {
    lookup[collection[i].buzzWord] = collection[i];
  }

  var changedPoints = lookup[buzzy].points = newPoints;
  var changedHeard = lookup[buzzy].heard = heardIt;

  //If successfully changed, send success and points.
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

//Delete route to delete buzzword objects.
app.delete('/buzzwords', function(req, res) {
  var buzzChange = req.body;
  var buzzy = buzzChange.buzzWord;
  console.log(score);

  var lookup = {};
  for (i = 0; i<collection.length; i++) {
    lookup[collection[i].buzzWord] = collection[i];
  }

  //Remove buzzword from collection.
  for (i=0; i<collection.length; i++) {
    var obj = collection[i];
    if (obj.buzzWord === buzzy) {
      collection.splice(i, 1);
      console.log(collection);
      return res.send({"success":true});
    } else {
      // return res.send({"success":false});
    }
  }

})

//Post route to reset buzzword collection and reset score to 0.
app.post('/reset', function(req,res) {
  score = 0;
  console.log(score);

  //If there has been a successful reset using splice, return success. 
  if (collection.splice(0, collection.length)) {
    console.log(collection);
    return res.send({"success": true});
  } else {
    return res.send({"success": false});
  }

})
