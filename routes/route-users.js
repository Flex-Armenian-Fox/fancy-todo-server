'use strict'

const route = require('express').Router()
const ControllerUser = require('../controllers/controller-user.js')

route.post('/register', ControllerUser.register)
route.post('/login', ControllerUser.login)

// ROUTER FOR LOG-IN WITH GOOGLE OAUTH:
route.post('/googleLogin', ControllerUser.googleLogin)

module.exports = route