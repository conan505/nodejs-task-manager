const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/users')
const Task = require('../src/models/tasks')
const { userOne, userOneId, userTwoId, taskOne, userTwo, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Learn nodejs'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('should get task of userOne', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    const tasks = response.body
    expect(tasks.length).toEqual(2)
})
test('UserTwo should not be able to delete the task of userOne', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
    expect(task.owner).toEqual(userOneId)
})