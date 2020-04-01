var couponCode = require('coupon-code');
const mongoose = require('mongoose');


const voucherSchema = schema({
    code : {
        type : String,
         required: 'Code is required..'
        },
    recepient : {
        type : Schema.Types.ObjectId, 
         ref: 'Recipient'
        },
    offer : {
        type : Schema.Types.ObjectId, 
         ref: 'Special_Offer'
        },
    used : {
        type: Boolean,
         default: false
        },
    track : {
        type: Date
    },
    expiryDate: {
        type: Date
    }
    
})
mongoose.model('Voucher', voucherSchema)

couponCode.generate({ partLen: 5, parts: 2});
couponCode.validate('G9I4-PLPB', { parts: 2});
var code = null;
do {
  code = couponCode.generate();
} while (!unique(code));
return code;
//mongoose.model('Voucher', voucherSchema)



