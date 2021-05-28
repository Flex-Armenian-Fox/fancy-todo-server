const express = require('express');
const router = express.Router();
const userC = require('../controllers/user-controller')

router.post('/register', userC.postRegister)
router.post('/login', userC.postLogin)

module.exports = router; 