const router = require('express').Router()
const UserController = require('../controllers/user_controller.js')

router.post('/register', UserController.registerUser)

router.post('/login', UserController.login)

module.exports = router