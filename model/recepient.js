const mongoose = require('mongoose');
const schema = mongoose.Schema;


module.exports = mongoose.model('Recepient', schema({
    name : {type : String, required: true},
    email : {type : String, required: true, unique: true}
    
}))

