'use strict'

const {Todo} = require('../models')

class ControllerTodo {

    static showAll (req, res) {
        Todo.findAll({
            where: {UserId: req.currentUser.id},
            order: [['id', 'ASC']]
        })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                res.status(500).json({
                    message: `Internal server error`
                })
            })
    }

    static createNew (req, res) {
        const input = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.currentUser.id
        }
        Todo.create(input)
            .then(newTodo => {
                res.status(201).json({newTodo})
            })
            .catch(err => {
                res.status(400).json(err.errors[0].message)
            })
    }

    static showOne (req, res) {
        const todoId = +req.params.id
        
        Todo.findByPk(todoId)
            .then(todo => {
                if (todo === null) {
                    throw {
                        name: 'Not Found',
                        message: `Todo with ID ${todoId} does not exist`
                    }
                } else {
                    res.status(200).json({todo}) 
                }
            })
            .catch(err => {
                if (err.name === 'Not Found') {
                    res.status(404).json({
                        message: err.message
                    })
                } else if (err.name === 'Not Authorised') {
                    res.status(401).json({
                        message: err.message
                    })
                }
            })
    }

    static putOne (req, res) {
        const {title, description, status, due_date} = req.body
        const todoId = +req.params.id
        Todo.update({title, description, status, due_date}, {
            where: {id: todoId},
            returning: true
        })
            .then(updated => {
                if (updated[0] === 0) {
                    throw {
                        name: 'Not Found',
                        message: `Todo with ID ${todoId} does not exist`
                    }
                } else {
                    res.status(200).json(updated[1][0])
                }
            })
            .catch(err => {
                if (err.name === 'Not Found') {
                    res.status(404).json({
                        message: err.message
                    })
                } else if (err.errors[0].type === 'Validation error') {
                    res.status(400).json({
                        message: err.errors[0].message
                    })
                } else {
                    res.status(500).json({
                        message: 'Internal server error'
                    })
                }
            })
    }

    static patchOne (req, res) {
        const todoId = +req.params.id
        const newStatus = req.body.status
        Todo.update({status: newStatus}, {
            where: {id: todoId},
            returning: true
        })
            .then(updated => {
                if (updated[0] === 0) {
                    throw {
                        name: 'Not Found',
                        message: `Todo with ID ${todoId} does not exist`
                    }
                } else {
                    res.status(200).json(updated[1])
                }
            })
            .catch(err => {
                if (err.name === 'Not Found') {
                    res.status(404).json({
                        message: err.message
                    })
                } else if (err.errors[0].type === 'Validation error') {
                    res.status(400).json({
                        message: err.errors[0].message
                    })
                } else {
                    res.status(500).json({
                        message: 'Internal server error'
                    })
                }
            })
    }

    static deleteOne (req, res) {
        const todoId = +req.params.id
        Todo.destroy({where: {id: todoId}})
            .then((deleted) => {
                if (deleted === 0) {
                    throw {
                        name: 'Not Found',
                        message: `Todo with ID ${todoId} does not exist`
                    }
                } else {
                    res.status(200).json({
                        message: `Todo with ID ${todoId} deleted successfully`
                    })
                }
            })
            .catch(err => {
                if (err.name === 'Not Found') {
                    res.status(404).json({
                        message: err.message
                    })
                } else {
                    res.status(500).json({
                        message: 'Internal server error'
                    })
                }
            })
    }

}

module.exports = ControllerTodo