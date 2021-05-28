const express = require('express');
const router = express.Router();
const todoRoute = require('./todos-route')
const userRoute = require('./users-route')

router.use('/todos', todoRoute)
router.use('/users', userRoute)

module.exports = router; 