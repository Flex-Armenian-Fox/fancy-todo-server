const express = require('express');
const router = express.Router();
const todoRoute = require('./todos-route')
const userRoute = require('./users-route')
const {authentication} = require('../middlewares/auth')

router.use('/todos', authentication, todoRoute)
router.use('/users', userRoute)

module.exports = router; 