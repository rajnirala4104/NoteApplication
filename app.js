const express = require('express')
const path = require('path')
// const mainJs = require('./static/js/main')
const app = express()

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/static'));

app.get('/', (req,res)=>{
    res.status(200).render('index')
})

app.post('/',(req,res)=>{
    console.log(req.body.userNote);
    res.status(200).render('index')
})

module.exports = app;