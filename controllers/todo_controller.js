const { Todo } = require('../models')

class Controller {
    static getTodos(req, res) {
        const userId = req.currentUser.id

        Todo.findAll({
            where: {
                user_id: userId
            }
        })
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getTodoById(req, res) {
        const todoId = +req.params.id

        Todo.findByPk(todoId)
        .then(todo => {
            if (!todo) {
                return res.status(404).json({ message: `Todo with id ${todoId} not found`})
            }

            return res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static createTodo(req, res) {
        const { title, description, status, due_date } = req.body
        const userId = req.currentUser

        Todo.create({ title, description, status, due_date, user_id: userId })
        .then(newTodo => {
            res.status(201).json({
                message: "Success create new todo",
                data: newTodo
            })
        })
        .catch(err => {
            if (err.name == "SequelizeValidationError") return res.status(400).json({ message: err.errors[0].message })
            
            return res.status(500).json(err)
        })
    }

    static putTodo(req, res) {
        const todoId = +req.params.id
        const { title, description, status, due_date } = req.body

        Todo.findByPk(todoId)
        .then(todo => {
            if (!todo) {
                throw {
                    name: "NotFound",
                    message: `Todo with id ${todoId} was not found`
                }
            }

            return Todo.update({
                title, description, status, due_date
            }, {
                where: { id: todoId },
                returning: true
            })
        })
        .then(newTodo => {
            return res.status(200).json({
                message: `Update success, ${newTodo[0]} row affected`,
                data: newTodo[1][0]
            })
        })
        .catch(err => {
            if (err.name == "SequelizeValidationError") return res.status(400).json({ message: err.errors[0].message })

            if (err.name == "NotFound") return res.status(404).json({ message: err.message })

            return res.status(500).json(err)
        })
    }

    static patchTodo(req, res) {
        const todoId = +req.params.id

        Todo.findByPk(todoId)
        .then(todo => {
            if (!todo) {
                throw {
                    name: "NotFound",
                    message: `Todo with id ${todoId} was not found`
                }
            }
            
            return Todo.update({
                status: req.body.status
            }, {
                where: { id: todoId },
                returning: true
            })
        })
        .then(newTodo => {
            return res.status(200).json({
                message: `Update success, ${newTodo[0]} row affected`,
                data: newTodo[1][0]
            })
        })
        .catch(err => {
            if (err.name == "SequelizeValidationError") return res.status(400).json({ message: err.errors[0].message })

            if (err.name == "NotFound") return res.status(404).json({ message: err.message })

            return res.status(500).json(err)
        })
    }

    static deleteTodo(req, res) {
        const todoId = +req.params.id
        let deletedTodo = null

        console.log("Controller::::", req.params)

        if (!req.params.id) {
            throw { name: 'BadRequest', message: 'Please provide todo id'}
        }
        
        Todo.findByPk(todoId)
        .then(todo => {
            if (!todo) {
                throw { name: 'NotFound', message: `Todo with id ${todoId} was not found` }
            }

            deletedTodo = todo

            return Todo.destroy({
                where: { id: todoId }
            })
        })
        .then(() => {
            return res.status(200).json({
                message: 'todo success to delete',
                data: deletedTodo
            })
        })
        .catch(err => {
            const { name, message } = err

            if (name == "NotFound") return res.status(404).json({ message })

            if (name == "BadRequest") return res.status(400).json({ message })

            return res.status(500).json(err)
        })
    }
}

module.exports = Controller