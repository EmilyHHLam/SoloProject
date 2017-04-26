var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ChildSchema = new Schema({
  first: String,
  last: String,
  dob: Date,
  gender: String
});

var  EventSchema = new Schema({
  date: String,
  time: String,
  childid: String

});



var Child = mongoose.model('child', ChildSchema, 'children');
var Events = mongoose.model('events', EventSchema, 'events');


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

 router.get('/posts/:childId', function(req, res) {
   console.log(req.params.childId);
   var id = req.params.childId;
      //Events.find({'childid': id}, function(err, posts) {
      Events.find({'childid': id}, function(err, posts) {
         //mongoose.model('posts').populate(posts, {path: 'childid'}, function(err, posts) {
        if(err) {
          console.log(err);
        }
//   //  mongoose.model('posts').populate(posts, {path: 'user'}, function(err, posts) {
       res.send(posts);
     //});
     });
  });


module.exports= router;
