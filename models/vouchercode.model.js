const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VoucherCodeSchema = new Schema({

    voucher_code:{
        type: String,
        required: true
    } ,
    current_date:{
        type: Date,
        required:true,
        default: Date.now

    },
    expiration_date:{
        type: Date,        
        required: true,
    },
    recipient : {
        type : Schema.Types.ObjectId,  
        ref: 'Recipient'
    },
    special_offer : {
        type : Schema.Types.ObjectId, 
         ref: 'SpecialOffer'
        },
    used: {
        type: Boolean,
        default: false
    },
    dateof_usage: {
        type: Date,
        default: null
    }

        
})


module.exports= mongoose.model('VoucherCode', VoucherCodeSchema);