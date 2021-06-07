const express = require('express');
const UsersController = require('../controllers/UsersController.js');
const router = express.Router();

router.post('/', UsersController.register)
router.post('/login', UsersController.login)
router.post('/login-google', UsersController.loginGoogle)
module.exports = router;