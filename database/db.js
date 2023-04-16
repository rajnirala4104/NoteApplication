const { MongoClient } = require('mongodb')


//---------DataBase has connected-----
async function main() {
    const uri = "mongodb+srv://rajmongo:rajmongo@cluster0.2yskbyq.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(uri)

    try {
        await client.connect()
        console.log("dataBase connected successfully")
    } catch (e) {
        console.log("Oops!!! something went wrong... try again to connect the database");
        console.error(e)
    } finally {
        await client.close()
    }
}


//-----------showing all the databases--------
async function showingAllTheDatabases(client) {
    const dbs = await client.db().admin().listDatabases();
    dbs.databases.forEach(db => {
        console.log(`- ${db.name}`)
    });
}

//----------read data from our database--------
async function readDataFromTheDataBase(client, data){
    const dataFromDB = await client.db('useNotes').collection('note').findOne(data)
    if(dataFromDB){
        console.log(dataFromDB)
    }else{
        console.error("Oops!! something went wrong...")
    }
}

//--------inserting some data--------
async function insertDataInMyDatabase(client, data){
    const result = await client.db('useNotes').collection('note').insertOne(data)
    if(result){
        console.log(`This Data ${result}\nhas inserted i your DataBase`)
    }else{
        console.log("Oops!!! i'm strugling to insert your data, wait or try again")
    }
}


const dataBaseOperations = {
    main,
    insertDataInMyDatabase,
    readDataFromTheDataBase,
    showingAllTheDatabases
}

module.exports = dataBaseOperations