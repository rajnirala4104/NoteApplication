const express = require('express')
const path = require('path')
const {main, client, insertDataInMyDatabase, readDataFromTheDataBase} = require('./database/db')
const app = express()
main()
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/static'));


app.get('/', (req,res)=>{
    res.status(200).render('index', readAllTheDataFromTheDataBase())
})


app.post('/',(req,res)=>{
    res.status(200).render('index');
    console.log(req.body.userNote);
    insertDataInMyDatabase(client, {note: req.body.userNote}).then((result)=>{
        // console.log(`data : "${result}"`);
    }, (err)=>{
        console.log(err)
    })
})

const readAllTheDataFromTheDataBase = async ()=>{
    const dataArr = await readDataFromTheDataBase(client)
    for (const dataObject of dataArr) {
        console.log(dataObject.note);
    }
}



module.exports = app;