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


////////////////

const main = async () => {
    // const task = await Task.findById('6235b9dfcbd82e560be892a2')
    // await task.populate('owner')
    // console.log(task.owner);

    const user = await User.findById('6235b95026f9e549b7ebdd29');
    await user.populate('tasks')
    console.log(user.tasks);
}

main();












