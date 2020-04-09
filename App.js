const express = require('express');
const recipientRouter = require('./Routes/Recipient');
const specialOfferRouter = require('./Routes/SpecialOffer');
const voucherRouter = require('./Routes/VoucherCode');
const mongoose = require('mongoose');

require('dotenv').config();

const recipientmodel  = require('./models/recipients.model')
 
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to the database'))

const app = express();
app.use(express.json())

const port = process.env.PORT || 3000;


app.use('/recipient', recipientRouter)
app.use('/specialoffer', specialOfferRouter)
app.use('/voucher', voucherRouter)


app.listen(port, () => {
    console.log('App listening on port 3000' );

})