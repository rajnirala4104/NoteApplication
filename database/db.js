const { MongoClient } = require('mongodb')


//---------DataBase has connected-----
const uri = "mongodb+srv://rajmongo:rajmongo@cluster0.2yskbyq.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)
async function main() {
    try {
        await client.connect()
        console.log("database connected successfully")
    } catch (e) {
        console.log("Oops!!! something went wrong... try again to connect the database");
        console.error(e)
    } 
    // finally {
    //     await client.close()
    // }
}


//-----------showing all the databases--------
async function showingAllTheDatabases(client) {
    const dbs = await client.db().admin().listDatabases();
    dbs.databases.forEach(db => {
        console.log(`- ${db.name}`)
    });
}

//----------read data from our database--------
async function readDataFromTheDataBase(client){
    const dataFromDB = await client.db('userNotes').collection('Note').find({}).toArray()
    if(dataFromDB.length > 0){
        return dataFromDB
    }else{
        return "Oops!! something went wrong..."
    }
}


//--------inserting some data--------
async function insertDataInMyDatabase(client, data){
    // client.db('userNote').collection('Note').createIndex( { "user_id": 1 }, { unique: true } )

    const result = await client.db('userNotes').collection('Note').insertOne(data)

    if(result){
        return `Your Data has inserted i your DataBase with id : ${result.insertedIds}`
    }else{
        return "Oops!!! i'm strugling to insert your data, wait or try again"
    }
}

//--------------deleting note--------------
async function DeleteNote(client, data){
    const result = await client.db('userNotes').collection('Note').deleteOne(data);
    if(result){
        console.log('note has deleted successfully...');
    }else{
        console.log("we're faceing a problem to delete the note.. wait or try again..")
    }
}

// main()


const dataBaseOperations = {
    main,
    insertDataInMyDatabase,
    readDataFromTheDataBase,
    showingAllTheDatabases,
    DeleteNote,
    client
}

module.exports = dataBaseOperations