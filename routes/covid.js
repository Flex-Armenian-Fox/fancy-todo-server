const express = require('express');
const router = express.Router();
const CovidController = require('../controllers/CovidController.js')

router.get('/', CovidController.toList)

module.exports = router;