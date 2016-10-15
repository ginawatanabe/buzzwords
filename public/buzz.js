var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

var buzzwords = [];

app.listen(3000);

app.get('/', function (req, res) {
  res.render('/index');
});

app.get('/buzzwords', function (req, res) {
  res.send({
    buzzwords: ["um", "er", "like"]
  })
});

app.post('/buzzword', function (req, res) {
  res.json({
    buzzwords: "Hello",
    points: "5"
  })

  var newBuzz = req.body;

  buzzwords.push(newBuzz);

  res.send({success: true, buzzwords: newBuzz});

})
//
// app.put('/buzzword', function (req,res) {
//   res.json(
//     "buzzword":
//   )
// })
//
// app.put('/buzzword')
