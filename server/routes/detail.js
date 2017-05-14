var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'), Schema = mongoose.Schema;


var  EventSchema = new Schema({});

var  ActivitySchema = new Schema({
  date: String,
  time: String,
  note: String,
  etype: String,
  child_id: String

});
var  MetricSchema = new Schema({
  date: String,
  note: String,
  etype: String,
  height: String,
  weight: String,
  wpercent: String,
  hpercent: String,
  child_id: String

});

var Event = mongoose.model('events', EventSchema, 'events');
var Activity = mongoose.model('activity', ActivitySchema, 'events');
var Metric = mongoose.model('metric', MetricSchema, 'events');

router.get('/:id', function(req, res) {
     Event.find({'child_id': req.params.id}, null, {sort: {_id: -1}}, function(err, eventList) {
      res.send(eventList);
    });

 });

 router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Event.findByIdAndRemove(id, function(err, deletedEvent){
    if(err){
      console.log(err);
  res.sendStatus(200);
  }

  res.send(deletedEvent);
  });
});
//activity
router.put('/activity', function(req, res, next) {
    var id = req.body._id;
    // console.log('edit activity in server', req.body);
    Activity.findById(id, function (err, editevent) {
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
  //metrics
  router.put('/metric', function(req, res, next) {
      var id = req.body._id;
      // console.log('edit metric in server', req.body);
      // console.log('edit id in server', id);
      Metric.findById(id, function (err, editmetric) {
        if (err) {
          res.sendStatus(500);
        }
        else{
            editmetric.date = req.body.date || editmetric.date;
            editmetric.note = req.body.note || editmetric.note;
            editmetric.weight = req.body.weight || editmetric.weight;
            editmetric.height = req.body.height || editmetric.height;
            editmetric.wpercent = req.body.wpercent || editmetric.wpercent;
            editmetric.hpercent = req.body.hpercent || editmetric.hpercent;
            editmetric.etype = req.body.etype || editmetric.etype ;
            editmetric.save(function (err, editmetric) {
              if (err) {
                res.sendStatus(500);
              }
              res.send(editmetric);
            });
          }

      });
    });
 router.post('/activity', function(req, res) {
   var activity = new Activity({
     date: req.body.date,
     time: req.body.time,
     note: req.body.note,
     etype: req.body.etype,
     child_id: req.body.id
   });
   activity.save(function(err, savedActivity) {
     if(err) {
       console.log("mongo error" + err);
       res.sendStatus(500);
     }
     res.send(savedActivity);
   });
 });
 router.post('/metric', function(req, res) {
   console.log('child in details in server', req.body);
   var metric = new Metric({
     date: req.body.date,
     note: req.body.note,
     etype: req.body.etype,
     height: req.body.height,
     weight: req.body.weight,
     wpercent: req.body.wpercent,
     hpercent: req.body.hpercent,
     child_id: req.body.id
   });
   metric.save(function(err, savedMetric) {
     if(err) {
       console.log("mongo error" + err);
       res.sendStatus(500);
     }
     res.send(savedMetric);
   });
 });

 module.exports= router;
