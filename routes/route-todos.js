'use strict'

const route = require('express').Router()
const ControllerTodo = require('../controllers/controller-todos.js')

route.get('/', ControllerTodo.showAll)
route.post('/', ControllerTodo.createNew)
route.get('/:id', ControllerTodo.showOne)
route.put('/:id', ControllerTodo.putOne)
route.patch('/:id', ControllerTodo.patchOne)
route.delete('/:id', ControllerTodo.deleteOne)

module.exports = route