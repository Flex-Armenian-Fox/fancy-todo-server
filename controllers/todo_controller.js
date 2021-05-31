const { Todo } = require('../models')
const CustomError = require('../middlewares/error_handler.js')

class Controller {
    static async getTodos(req, res, next) {
        try {
            const userId = req.currentUser.id
            const todos = await Todo.findAll({
                where: { user_id: userId }
            })

            res.status(200).json(todos)
        } catch (error) {
            next(error)
        }
    }

    static async getTodoById(req, res, next) {
        try {
            const todoId = +req.params.id
            const todo = await Todo.findByPk(todoId) 
            
            if (!todo) {                  
                throw new CustomError('NotFound', 404, {
                    table: 'Todo',
                    id: todoId
                })              
            }
    
            res.status(200).json(todo)
        } catch (error) {
            next(error)
        }
    }

    static async createTodo(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body
            const userId = req.currentUser.id
            const newTodo = await Todo.create({ title, description, status, due_date, user_id: userId })

            res.status(201).json({
                message: "Success create new todo",
                data: newTodo
            })
        } catch (error) {
            next(error)
        }
    }

    static async putTodo(req, res, next) {
        try {
            const todoId = +req.params.id
            const { title, description, status, due_date } = req.body
            const newTodo = await Todo.update({
                title, description, status, due_date
            }, {
                where: { id: todoId },
                returning: true
            })
            
            res.status(200).json({
                message: `Update success, ${newTodo[0]} row affected`,
                data: newTodo[1][0]
            })
        } catch (error) {
            next(error)
        }
    }

    static async patchTodo(req, res, next) {
        try {
            const todoId = +req.params.id
            const newTodo = await Todo.update({
                status: req.body.status
            }, {
                where: { id: todoId },
                returning: true
            })
            
            res.status(200).json({
                message: `Update success, ${newTodo[0]} row affected`,
                data: newTodo[1][0]
            })
        } catch (error) {            
            next(error)
        }
    }

    static async deleteTodo(req, res, next) {
        try {
            const todoId = +req.params.id
            let deletedTodo = req.currentUser.todo
            await Todo.destroy({
                where: { id: todoId }
            })

            res.status(200).json({
                message: 'todo success to delete',
                data: deletedTodo
            })            
        } catch (error) {            
            next(error)
        }
    }
}

module.exports = Controller