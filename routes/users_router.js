const router = require('express').Router()
const UserController = require('../controllers/user_controller.js')

router.post('/register', UserController.registerUser)

router.post('/login', UserController.login)

router.post('/google-login', UserController.googleLogin)

router.post('/facebook-login', UserController.facebookLogin)

module.exports = router