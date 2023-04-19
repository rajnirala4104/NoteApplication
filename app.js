const express = require('express')
const path = require('path')
const {main, client, insertDataInMyDatabase, readDataFromTheDataBase, showingAllTheDatabases, } = require('./database/db')
const app = express()
main()
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/static'));


app.get('/', (req,res)=>{
    res.status(200).render('index')
})

// readDataFromTheDataBase(client, {note: "raj is a super hero"}).then((result)=>{
//         console.log("red successully...", result)
// }, (err)=>{
//     console.log("Oops!!! we're facing some problem to read the data.. please wait or try again..", err);
// })


app.post('/',(req,res)=>{
    res.status(200).render('index');
    console.log(req.body.userNote);
    insertDataInMyDatabase(client, {note: req.body.userNote}).then((result)=>{
        // console.log(`data : "${result}"`);
    }, (err)=>{
        console.log(err)
    })
})

module.exports = app;