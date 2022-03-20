const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/users')
const { userOne, userOneId, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('should sign up a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Rahul Garg',
            age: '22',
            email: 'rahulruchikagarg@gmail.com',
            password: 'Rahul@123'
        })
        .expect(201)

    // Assert that the User in response exists in the DB
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull();

    // Assertion to check the response body
    expect(response.body).toMatchObject({
        user: {
            name: 'Rahul Garg',
            email: 'rahulruchikagarg@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Rahul@123')
})

test('should login the user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)

    // Assetion to check that the token received is stored in the DB
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('should not login a non-existent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: 'ksjdnf12'
        })
        .expect(400)
})

test('Should get the profile of a user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get the profile of an unathenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete the account of user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // Assertion to check whether user is actually deleted
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete the account of an unathenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})
test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Rohit'
        })
        .expect(200)
    const user = await User.findById(userOneId);
    expect(user.name).toBe('Rohit');
})
test('Should not update invalid user field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Delhi'
        })
        .expect(400)
})