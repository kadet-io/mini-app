const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const specialOfferSchema = new Schema({

    offer_name:{
        type: String,
        required: true
    } ,
    fixed_percentage:{
        type: Number,
        required: true,
    }
        
})




module.exports= mongoose.model('SpecialOffer', specialOfferSchema);