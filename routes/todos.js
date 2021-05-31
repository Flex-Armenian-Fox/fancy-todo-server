const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/TodosController.js')

router.post('/', TodosController.createData)
router.get('/', TodosController.toList)
router.get('/:id', TodosController.getById)
router.put('/:id', TodosController.updateData)
router.patch('/:id', TodosController.setStatus)
router.delete('/:id', TodosController.deleteData)
module.exports = router;