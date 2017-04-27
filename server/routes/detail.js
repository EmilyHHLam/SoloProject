var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'), Schema = mongoose.Schema;


var  EventSchema = new Schema({
  date: Date,
  time: String,
  note: String,
  etype: Number,
  // child_id: {
  //   type: Schema.Types.Object,
  //   ref: 'children'
  // }
  child_id: String

});

var Event = mongoose.model('events', EventSchema, 'events');


router.get('/', function(req, res) {
  console.log(req.params.child_id);
  var id = req.params.childId;
     Event.find({'child_id': '5900f07accf61604533a7233'}, function(err, eventList) {
      console.log('event in fac:', eventList);
      res.send(eventList);
    });

 });

//Event.find({'childid': id}, function(err, posts) {
//      Event.find({'child_id': id}, function(err, posts) {
//         //mongoose.model('posts').populate(posts, {path: 'childid'}, function(err, posts) {
//       //  if(err) {
//       //    console.log(err);
//       //  }
// //   //  mongoose.model('posts').populate(posts, {path: 'user'}, function(err, posts) {
//       res.send(posts);
//});

 router.post('/', function(req, res) {
   console.log('child in details' + req.body);
   var event = new Event({
     date: req.body.date,
     time: req.body.time,
     note: req.body.note,
     etype: req.body.eventtype,
     child_id: req.body.id
   });
   event.save(function(err, savedEvent) {
     if(err) {
       console.log("mongo error" + err);
       res.sendStatus(500);
     }
     res.send(savedEvent);
   });
 });

 module.exports= router;
