const { Todo } = require('../models')

class Controller {
    static getTodos(req, res, next) {
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
            const { name, message } = err
            next({ name, message })
        })
    }

    static getTodoById(req, res, next) {
        const todoId = +req.params.id

        Todo.findByPk(todoId)
        .then(todo => {
            if (!todo) {
                throw { name: 'TodoNotFound', data: {
                    table: 'Todo',
                    id: todoId
                }}                
            }

            return res.status(200).json(todo)
        })
        .catch(err => {
            const { name, message, data } = err
            next({ name, message, data })
        })
    }

    static createTodo(req, res, next) {
        const { title, description, status, due_date } = req.body
        const userId = req.currentUser.id

        Todo.create({ title, description, status, due_date, user_id: userId })
        .then(newTodo => {
            res.status(201).json({
                message: "Success create new todo",
                data: newTodo
            })
        })
        .catch(err => {
            const { name, message } = err
            next({ name, message })
        })
    }

    static putTodo(req, res, next) {
        const todoId = +req.params.id
        const { title, description, status, due_date } = req.body
        
        Todo.update({
            title, description, status, due_date
        }, {
            where: { id: todoId },
            returning: true
        })
        .then(newTodo => {
            res.status(200).json({
                message: `Update success, ${newTodo[0]} row affected`,
                data: newTodo[1][0]
            })
        })
        .catch(err => {
            const { name, message } =  err

            next({ name, message })            
        })
    }

    static patchTodo(req, res, next) {
        const todoId = +req.params.id

        Todo.update({
            status: req.body.status
        }, {
            where: { id: todoId },
            returning: true
        })
        .then(newTodo => {
            res.status(200).json({
                message: `Update success, ${newTodo[0]} row affected`,
                data: newTodo[1][0]
            })
        })
        .catch(err => {
            const { name, message } = err
            
            next({ name, message })
        })
    }

    static deleteTodo(req, res, next) {
        const todoId = +req.params.id
        let deletedTodo = req.currentUser.todo
        
        Todo.destroy({
            where: { id: todoId }
        })
        .then(() => {
            res.status(200).json({
                message: 'todo success to delete',
                data: deletedTodo
            })
        })
        .catch(err => {
            const { name, message } = err

            next({ name, message })
        })
    }
}

module.exports = Controller