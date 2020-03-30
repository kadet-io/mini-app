const express = require('express')
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const app = express();
const routes = require('./route/route')

mongoose.connect("mongodb://localhost:27017/voucher",{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}, ()=>{
    console.log("connected to DB")
})
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json())

app.use('/', routes)


const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Server started at port ${port}`);
})