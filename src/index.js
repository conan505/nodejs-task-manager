const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express();
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     console.log(req.method, req.path, req);
//     res.status(503).send('maintainence');


// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up at ' + port)
})














