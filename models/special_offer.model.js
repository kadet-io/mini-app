const mongoose = require('mongoose');

var offerSchema = new mongoose.Schema({
name: {
    type: String,
    required: 'Full Name is required.'
},
discount: {
    type: String,
    
}
});

mongoose.model('Special_Offer', offerSchema)