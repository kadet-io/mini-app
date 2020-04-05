const mongoose = require('mongoose');

var recipientSchema = new mongoose.Schema({
full_name: {
    type: String,
    required: 'Full Name is required.'
},
email: {
    type: String,
    required: 'Email is required.'
    
}
});

mongoose.model('Recipient', recipientSchema)