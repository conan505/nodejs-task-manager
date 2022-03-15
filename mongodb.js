const mongodb = require("mongodb")
const { MongoClient, ObjectId } = mongodb;


const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionUrl, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!")
    }

    const db = client.db(databaseName);

    // for querying data

    db.collection('tasks').findOne({ _id: new ObjectId("622f72b53173838ab136553c") }, (error, task) => {
        if (error) return console.log(error);
        console.log(task);
    })
    db.collection('tasks').find({ completed: true }).toArray((error, result) => {
        console.log(result);
    })

    //for updating data (updateOne and updateMany)

    db.collection('tasks').updateMany(
        {
            completed: true
        },
        {
            $set: {
                completed: false
            }
        }
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })


    //for deleting data (deleteOne and deleteMany)
    db.collection('users').deleteMany(
        {
            name: 'Rahul Garg'
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })

})
