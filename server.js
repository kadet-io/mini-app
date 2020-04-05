require('./models/db');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const express_handlebar = require('express-handlebars');
const bodyparser = require('body-parser');
const voucher = require('./controller/voucher');

var app = express();
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());
app.use('/', voucher)

app.set('views',path.join(__dirname, '/views/'));
app.engine('hbs',express_handlebar({extname: '.hbs', defaultLayout: 'mainLayout', layoutsDir:__dirname + '/views/layouts/'}));
app.set('view engine','hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
    
});