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
  //console.log('child app.js' + req.body);
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

router.put('/', function(req, res, next) {
    var id = req.body._id;
    console.log('id for edit' + id);

    Child.findById(id, function (err, editchild) {
       if (err) {
         res.sendStatus(500);
       }
        else {
          editchild.first = req.body.first || editchild.first;
          editchild.last = req.body.last || editchild.last;
          editchild.dob = req.body.dob || editchild.dob;
          editchild.gender = req.body.gender || editchild.gender;
          editchild.save(function (err, editchild) {
            if (err) {
              res.sendStatus(500);
            }
            res.send(editchild);
          });
        }

    });
  });


module.exports= router;
