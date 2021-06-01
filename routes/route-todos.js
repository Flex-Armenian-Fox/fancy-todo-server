'use strict'

const route = require('express').Router()
const ControllerTodo = require('../controllers/controller-todos.js')
const {authorisation} = require('../helpers/middlewares/authorisation.js')

route.get('/', ControllerTodo.showAll)
route.post('/', ControllerTodo.createNew)

route.get('/weather', ControllerTodo.getWeather)

route.get('/:id', authorisation, ControllerTodo.showOne)
route.put('/:id', authorisation, ControllerTodo.putOne)
route.patch('/:id', authorisation, ControllerTodo.patchOne)
route.delete('/:id', authorisation, ControllerTodo.deleteOne)

module.exports = route