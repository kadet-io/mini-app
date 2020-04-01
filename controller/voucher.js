const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Voucher = require('../models/voucher');
const recipient = require('../models/recipient.model');
const special_offer = require('../models/special_offer.model');
const { uuid } = require('uuidv4')


router.post('/recipient',(req, res) => {
    insertRecord(req,res)
    
    
    });
    function insertRecord(req,res) {
        var recipient = new recipient()
        recipient.fullname = req.body.fullname;
        recipient.email = req.body.email;
        recipient.save((err) => {
            if(!err)
            res.json('Saved Successfully');
            else {
                    res.json('Error occur when saving : ' + err);

                
                
            }
        });
    }

    //Offer
    router.post('/special_offer',(req, res) => {
        insertRecord(req,res)
        
        
        });
        function insertRecord(req,res) {
            var offer = new offer();
            offer.name = req.body.name;
            offer.discount = req.body.discount;
            offer.save((err) => {
                if(!err)
                res.json('Saved Successfully');
                else {
                        res.json('Error occur when saving : ' + err);
    
                    
                    
                }
            });
        }

        router.post('/voucher',(req, res) => {
            insertRecord(req,res)
            
            
            });

        function insertRecord(req, res){
            var code = uuid();
            var new_voucher = new new_voucher();
            new_voucher.name = req.body.name;
            new_voucher.discount = req.body.discount;
            code = code;

            new_voucher.save((err) => {
                if(!err)
                res.json('Saved Successfully');
                else {
                        res.json('Error occur when saving : ' + err);   
                    
                }
            });
        }

        router.get('/unique-voucher/:id',  (req, res) => {
            insertUserVoucher
        });

        function insertUserVoucher(req, res){
            if(!req.body.recepient || !req.body.email ){
                res.json({
                    success: false,
                    message: 'recepient and offer required'
                })
            }else{
            Recepient.findOne({email : req.body.email}).then(recepient =>{
            var id = recepient.id
        new_voucher.findOne({code: req.body.code, recepient: id}, (err, voucher)=>{
            var expire = new Date(voucher.expiryDate)
            var currentDate = new Date()
            if(!voucher.used && currentDate > expire ){
                voucher.comparecode(req.body.code, function(err, match) {
                    if (match && !err) {
                      var offer = voucher.offer
                      offer.findById({_id: offer}, (err, res) =>{
                          if(err){
                            res.json({
                                success: false,
                                message: 'offer not found'
                            })
                        }
                        else{
                            Voucher.findByIdAndUpdate({_id: voucher._id}, {$set: {track: new Date(), used: true}}, (err, track)=>{
                                if(err){
                                  res.json({
                                      success: true,
                                      message: 'unable to update voucher track',
                                      
                                  })
                                }else{
                                  res.json({
                                      success: true,
                                      message: 'found discount',
                                      discount: res.discount
                                  })
                                }
                            })
                          
                        }
                    })
                } else {
                    res
                      .status(401)
                      .send({ success: false, message: "Incorrect voucher code!!" });
                  }
                });
          }
      })
      
      }).catch(err =>{
          res.json({
              success: false,
              message: 'recepient not found'
              
          })
      })
      
  }

        })


module.exports = router;