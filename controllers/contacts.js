const express = require('express');
const router = express.Router();
const Contacts = require('../models/contacts.js');

//Index
router.get('/', (req ,res)=>{
    Contacts.find({}, (err, foundContacts)=>{
        res.json(foundContacts);
    });
});
//New- front-end
//Delete
router.delete('/:id', (req,res)=>{
    Contacts.findByIdAndRemove(req.params.id, (err, deletedContact)=>{
        res.json(deletedContact);
    });
});
//Update
router.put('/:id', (req,res)=>{
    Contacts.findByIdAndUpdate(req.params.id, req.body, {new:true},(err, updatedContact)=>{
        res.json(updatedContact);
    });
});
//Create
router.post('/', (req,res)=>{
    Contacts.create(req.body, (err, createdContact)=>{
        res.json(createdContact);
    });
});
//Edit- frontend
//Show
router.get('/:id', (req,res)=>{
    Contacts.findById(req.params.id, (err, foundContact)=>{
        res.json(foundContact);
    });
});

module.exports = router;