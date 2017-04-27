var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ChildSchema = new Schema({
  first: String,
  last: String,
  dob: Date,
  gender: String
});



var Child = mongoose.model('child', ChildSchema, 'children');


router.get('/', function(req, res){
  Child.find({}, function(err, children) {
    if (err){
      console.log('mongo error', err);
      res.send(500);
    }
    res.send(children);
  });
});

router.post('/', function(req, res) {
  console.log('child app.js' + req.body);
  var child = new Child({
    first: req.body.first,
    last: req.body.last,
    dob: req.body.dob,
    gender: req.body.gender
  });
  child.save(function(err, savedChild) {
    if(err) {
      console.log("mongo error" + err);
      res.sendStatus(500);
    }
    res.send(savedChild);
  });
});




module.exports= router;
