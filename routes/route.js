const express = require('express');
const router = express.Router();
const {authentication} = require('../middlewares/auth.js')

router.use('/covid', require('./covid.js'))
router.use('/users', require('./users.js'))
router.use(authentication)
router.use('/todos', require('./todos.js'))

module.exports = router;