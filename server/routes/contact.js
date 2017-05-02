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

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Contact.findByIdAndRemove(id, function(err, deletedContact){
   if(err){
     console.log(err);
     res.sendStatus(200);
   }

   res.send(deletedContact);
 });
});
//edit the contact
router.put('/', function(req, res, next) {
    var id = req.body._id;
    Event.findById(id, function (err, editcontact) {
      if (err) {
        res.sendStatus(500);
      }
      else{
          editcontact.date = req.body.date || editcontact.date;
          editcontact.time = req.body.time || editcontact.time;
          editcontact.note = req.body.note || editcontact.note;
          editcontact.etype = req.body.etype || editcontact.etype ;
          editcontact.save(function (err, editcontact) {
            if (err) {
              res.sendStatus(500);
            }
            res.send(editcontact);
          });
        }

    });
  });


module.exports= router;
