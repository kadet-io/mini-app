const express = require('express')
const router = express.Router();
const Voucher = require('../model/voucher-code');
const Recepient = require('../model/recepient');
const Offer = require('../model/special-offer');
const { uuid } = require('uuidv4');

router.get('/recepient/:id', (req, res) => {
    
    Recepient.findOne({_id: req.params.id }, (err, recepient)=> {
        if(err){
            res.json({
                success : false,
                message : 'No recepient found'
            })
        } else {
            res.json({
                success : true,
                recepient
            })
        }
    })
})


router.get('/recepients', (req, res) => {
    Recepient.find({}, (err, recepient) => {
        if(err){
            res.json({
                success : false,
                message : 'recepients not found'
            })
        }else {
            res.json({
              success : true,
              recepient  
            })
        }
    })
})

router.get('/offers', (req, res) => {
    Offer.find({}, (err, offers) => {
        if(err){
            res.json({
                success : false,
                message : 'ofers not found'
            })
        }else {
            res.json({
              success : true,
              offers  
            })
        }
    })
})


router.post('/recepient', (req, res) => {
    if(!req.body.name || !req.body.email){
        res.json({
            success: false,
            message: 'name and email required'
        })
    }else{
        const newRecepient = new Recepient({
            name: req.body.name,
            email: req.body.email
        })
        newRecepient.save(err =>{
            if(err){
                res.json({
                    success: false,
                    message: 'error creating recepient'
                })
            }else{
                res.json({
                    success: true,
                    message: 'recepient created'
                })
            }
        })
    }
})
router.post('/offer', (req, res) => {
    if(!req.body.name || !req.body.discount){
        res.json({
            success: false,
            message: 'name and discount required'
        })
    }else{
        const newOffer = new Offer({
            name: req.body.name,
            discount: req.body.discount
        })
        newOffer.save(err =>{
            if(err){
                res.json({
                    success: false,
                    message: 'error creating offer'
                })
            }else{
                res.json({
                    success: true,
                    message: 'offer created'
                })
            }
        })
    }
})
router.post('/voucher', (req, res) => {
    if(!req.body.recepient || !req.body.offer){
        res.json({
            success: false,
            message: 'recepient and offer required'
        })
    }else{
        const code = uuid()
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);
        const newVoucher = new Voucher({  
            recepient: req.body.recepient,
            offer: req.body.offer,
            code: code,
            expiryDate: tomorrow
        })
        newVoucher.save(err =>{
            if(err){
                res.json({
                    success: false,
                    message: 'error creating offer'
                })
            }else{
                res.json({
                    success: true,
                    message: 'voucher created',
                    code: code
                })
            }
        })
    }
})
router.get('/verify-voucher',  (req, res) => {
    if(!req.body.email || !req.body.offer){
        res.json({
            success: false,
            message: 'recepient and offer required'
        })
    }else{             
        Recepient.findOne({email : req.body.email}).then(recepient =>{
            let id = recepient.id
        Voucher.findOne({offer: req.body.offer, recepient: id}, (err, voucher)=>{
            let exp = new Date(voucher.expiryDate)
            let currDate = new Date()
            if(voucher.used == false && currDate > exp ){
                voucher.comparecode(req.body.code, function(err, match) {
                    if (match && !err) {
                      let offer = voucher.offer
                      Offer.findById({_id: offer}, (err, res) =>{
                          if(err){
                            res.json({
                                success: false,
                                message: 'offer not found'
                            })
                          }else{
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