'use strict'

const route = require('express').Router()
const routeTodos = require('./route-todos.js')
const routeUsers = require('./route-users.js')

route.use('/todos', routeTodos)
route.use('/users', routeUsers)

module.exports = route