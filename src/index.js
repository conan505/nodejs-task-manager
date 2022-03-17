const express = require('express');
require('./db/mongoose')
const Task = require('./models/tasks');
const User = require('./models/users');

const app = express();

app.use(express.json());
const port = process.env.PORT || 3000

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e);
    }

    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e);
    }

    // User.find({}).then((users) => {
    //     res.status(200).send(users);
    // }).catch((e) => {
    //     res.status(500).send(e);
    // })
})
app.get('/users/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e);
    }

    // User.findById(_id).then((user) => {
    //     if (!user) return res.status(404)

    //     res.status(200).send(user);
    // }).catch((e) => {
    //     res.status(500).send(e);
    // })
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status().send(e);
    }

    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
    // Task.find({}).then((tasks) => {
    //     res.status(200).send(tasks);
    // }).catch((e) => {
    //     res.status(500).send(e);
    // })
})
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) return res.status(404)

    //     res.status(200).send(task);
    // }).catch((e) => {
    //     res.status(500).send(e);
    // })
})

app.listen(port, () => {
    console.log('Server is up at ' + port)
})














