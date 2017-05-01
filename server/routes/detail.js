var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'), Schema = mongoose.Schema;


var  EventSchema = new Schema({
  date: Date,
  time: String,
  note: String,
  etype: String,
  child_id: String

});

var Event = mongoose.model('events', EventSchema, 'events');


router.get('/:id', function(req, res) {
  // console.log('here: ' + req.params.id);
     Event.find({'child_id': req.params.id}, function(err, eventList) {
      // console.log('event in fac:', eventList);
      res.send(eventList);
    });

 });

 router.delete('/:id', function(req, res) {
  var id = req.params.id;
  // console.log('id=' + id);
  Event.findByIdAndRemove(id, function(err, deletedEvent){
    if(err){
      console.log(err);
  res.sendStatus(200);
  }

  res.send(deletedEvent);
  });
});

router.put('/', function(req, res, next) {
    var id = req.body._id;
    // console.log('id'+ id);

    Event.findById(id, function (err, editevent) {
      if (err) {
        res.sendStatus(500);
      }
      else{
          editevent.date = req.body.date || editevent.date;
          editevent.time = req.body.time || editevent.time;
          editevent.note = req.body.note || editevent.note;
          editevent.etype = req.body.etype || editevent.etype ;
          editevent.save(function (err, editevent) {
            if (err) {
              res.sendStatus(500);
            }
            res.send(editevent);
          });
        }

    });
  });


 router.post('/', function(req, res) {
  //  console.log('child in details' + req.body);
   var event = new Event({
     date: req.body.date,
     time: req.body.time,
     note: req.body.note,
     etype: req.body.etype,
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
