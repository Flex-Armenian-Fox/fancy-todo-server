'use strict'

const route = require('express').Router()
const ControllerUser = require('../controllers/controller-user.js')

route.post('/register', ControllerUser.register)
route.post('/login', ControllerUser.login)

module.exports = route