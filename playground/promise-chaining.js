require("../src/db/mongoose")
const Task = require("../src/models/tasks");

// Task.findByIdAndDelete({ _id: "6230bdd20ef99bd462d1cdd8" }).then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: true })
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

const taskDeleteAndCount = async (id, isComplete) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: isComplete });
    return {
        task,
        count
    }
}

taskDeleteAndCount('6230cf22723c544ec0df4eb2', true).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})