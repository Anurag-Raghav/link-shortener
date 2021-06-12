const path = require('path');
const express = require('express');
const app = express();
require('./db/conn');
const hbs = require('hbs');
const port = process.env.PORT || 8000;
// static
app.use(express.static(path.join(__dirname,'/public')));

app.use(express.json({extended: false}));
app.use(express.urlencoded({extended:false}))

// define hbs
app.set('view engine' , 'hbs')
app.set('views' , 'views');

// define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

// main page

app.get('/', (req,res)=>{
    res.render('index')
})

app.listen(port,()=>{
    console.log('listening');
})