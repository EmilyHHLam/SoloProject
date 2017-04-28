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


router.get('/:id', function(req, res) {
  console.log('here: ' + req.params.id);
     Event.find({'child_id': req.params.id}, function(err, eventList) {
      console.log('event in fac:', eventList);
      res.send(eventList);
    });

 });

 router.delete('/:id', function(req, res) {
  var id = req.params.id;
  console.log('id=' + id);
  Event.findByIdAndRemove(id, function(err, deletedEvent){
    if(err){
      console.log(err);
  res.sendStatus(200);
  }

  res.send(deletedEvent);
  });
});

router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    console.log('id'+ i + '/body' + req.body);
    var event = new Event({
    date: req.body.date,
    time: req.body.time,
    note: req.body.note,
    etype: req.body.eventtype
    });
    Post.findByIdAndUpdate(id, function (err, editedEvent) {
        if (err) return next(err);
         res.send(editedEvent);
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
