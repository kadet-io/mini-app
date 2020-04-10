const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const recipientSchema = new Schema({

    full_name:{
        type: String,
        required: true
    } ,
    email:{
        type: String,
        required: true,
        unique: true,
    }
        
})

recipientSchema.plugin(uniqueValidator);

module.exports= mongoose.model('Recipient', recipientSchema);