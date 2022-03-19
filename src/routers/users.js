const express = require("express");
const auth = require("../middleware/auth");
const User = require('../models/users');

const router = express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e);
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidate) return res.status(400).send({ 'error': "Invalid Updates" })
    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])

        await user.save();

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) return res.status(404)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e);
    }

})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router