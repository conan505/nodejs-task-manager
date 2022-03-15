const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

const User = new mongoose.model('Users', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: 'Rahul Garg',
    age: '22'
})

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log(error);
})

const Task = new mongoose.model('Tasks', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const work = new Task({
    description: "Learn about hyperledger Fabric",
    completed: false
})

work.save().then(() => {
    console.log(work);
}).catch((error) => {
    console.log(error);
})

