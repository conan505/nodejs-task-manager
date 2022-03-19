const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks');
const Task = require('./models/tasks');
const User = require('./models/users');

const app = express();
const port = process.env.PORT || 3000


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up at ' + port)
})















