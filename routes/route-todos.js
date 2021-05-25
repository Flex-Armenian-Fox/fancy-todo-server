'use strict'

const route = require('express').Router()
const ControllerTodo = require('../controllers/controller-todos.js')

route.get('/todos', ControllerTodo.showAll)
route.post('/todos', ControllerTodo.createNew)
route.get('/todos/:id', ControllerTodo.showOne)
route.put('/todos/:id', ControllerTodo.putOne)
route.patch('/todos/:id', ControllerTodo.patchOne)
route.delete('/todos/:id', ControllerTodo.deleteOne)

// TO FIX
// 1. status harusnya type enum? (supaya pilihannya sudah diset)

module.exports = route