const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionUrl, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!")
    }

    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'Rahul Garg',
    //     age: '22'
    // })
    db.collection('users').insertMany([
        {
            name: 'John',
            age: '25'
        },
        {
            name: 'Alexa',
            age: '23'
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents!')
        }
        console.log(result.ops);
    })
    db.collection('tasks').insertMany([
        {
            description: 'Eat Donner',
            completed: true
        },
        {
            description: 'learn Dance',
            completed: true
        },
        {
            description: 'complete project',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents!')
        }
        console.log(result.ops);
    })
})