const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/TodosController.js')

router.post('/todos', TodosController.createData)
router.get('/todos', TodosController.toList)
router.get('/todos/:id', TodosController.getById)
router.put('/todos/:id', TodosController.updateData)
router.patch('/todos/:id', TodosController.setStatusDone)
router.delete('/todos/:id', TodosController.deleteData)
module.exports = router;