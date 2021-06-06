'use strict'

const route = require('express').Router()
const routeTodos = require('./route-todos.js')
const routeUsers = require('./route-users.js')
const {authenticate} = require('../helpers/middlewares/authentication.js')

route.use('/users', routeUsers)

route.use(authenticate)
route.use('/todos', routeTodos)

module.exports = route