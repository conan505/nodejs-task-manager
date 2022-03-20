const request = require('supertest')
const app = require('../../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/users')
const Task = require('../../src/models/tasks')


const userOneId = new mongoose.Types.ObjectId()
const userTwoId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'Aman',
    email: 'amangupta@gmail.com',
    password: 'qw12!!qw',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwo = {
    _id: userTwoId,
    name: 'Raj',
    email: 'rajsharma@gmail.com',
    password: 'qwqw4983@w',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First Task',
    completed: 'false',
    owner: userOneId
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    completed: 'true',
    owner: userOneId
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third Task',
    completed: 'false',
    owner: userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}