const { Todo } = require('../models')

class Controller {
    static getTodos(req, res) {
        Todo.findAll()
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static createTodo(req, res) {
        const { title, description, status, due_date } = req.body

        Todo.create({ title, description, status, due_date })
        .then(newTodo => {
            // console.log("ke insert")
            // res.status(201).json({
            //     message: "Success create new todo",
            //     data: newTodo
            // })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}

module.exports = Controller