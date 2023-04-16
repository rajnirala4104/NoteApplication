const express = require('express')
const path = require('path')
const {main, client, insertDataInMyDatabase, readDataFromTheDataBase, showingAllTheDatabases} = require('./database/db')
const app = express()
main()
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/static'));


app.get('/', (req,res)=>{
    res.status(200).render('index')
})

app.post('/',(req,res)=>{
    res.status(200).render('index');
    console.log(req.body.userNote);
    // const showingDBs = async ()=> console.log(await insertDataInMyDatabase(client, {note: req.body.userNote}))
    insertDataInMyDatabase(client, {note: req.body.userNote}).then((result)=>{
        console.log(result);
    }, (err)=>{
        console.log(err)
    })
})

module.exports = app;