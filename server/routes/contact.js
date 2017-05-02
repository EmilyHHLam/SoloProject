var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  note: String
});

var Contact = mongoose.model('contacts', ContactSchema, 'contact');

router.post('/', function(req, res) {
  var contact = new Contact({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    note: req.body.note
  });
  contact.save(function(err, savedContact) {
    if(err) {
      console.log('mongo error', err);
    }
    res.send(savedContact);
  });

});

router.get('/', function(req, res){
  Contact.find({}, function(err, contacts) {
    if (err){
      console.log('mongo error', err);
      res.send(500);
    }
    res.send(contacts);
  });
});




module.exports= router;
