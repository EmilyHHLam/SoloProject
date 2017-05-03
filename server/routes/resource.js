var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'), Schema = mongoose.Schema;


var  ResourceSchema = new Schema({
  title: String,
  link: String,
  note: String

});

var Resource = mongoose.model('resource', ResourceSchema, 'resource');

router.get('/', function(req, res){
  Resource.find({}, function(err, resources) {
    if (err){
      console.log('mongo error', err);
      res.send(500);
    }
    res.send(resources);
  });
});

 router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Resource.findByIdAndRemove(id, function(err, deletedResource){
    if(err){
      console.log(err);
  res.sendStatus(200);
  }

  res.send(deletedResource);
  });
});

router.put('/', function(req, res, next) {
    var id = req.body._id;
    Resource.findById(id, function (err, editresource) {
      if (err) {
        res.sendStatus(500);
      }
      else{
          editresource.date = req.body.date || editresource.date;
          editresource.time = req.body.time || editresource.time;
          editresource.note = req.body.note || editresource.note;
          editresource.etype = req.body.etype || editresource.etype ;
          editresource.save(function (err, editresource) {
            if (err) {
              res.sendStatus(500);
            }
            res.send(editresource);
          });
        }

    });
  });


 router.post('/', function(req, res) {
  //  console.log('child in details' + req.body);
   var resource = new Resource({
     title: req.body.title,
     link: req.body.link,
     note: req.body.note
   });
   resource.save(function(err, savedResource) {
     if(err) {
       console.log("mongo error" + err);
       res.sendStatus(500);
     }
     res.send(savedResource);
   });
 });

 module.exports= router;
