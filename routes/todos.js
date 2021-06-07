const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/TodosController.js')
const {authorizationTodo} = require('../middlewares/auth.js')

router.post('/', TodosController.createData)
router.get('/', TodosController.toList)
router.get('/:id', TodosController.getById)

router.put('/:id', authorizationTodo, TodosController.updateData)
router.patch('/:id', authorizationTodo, TodosController.setStatus)
router.delete('/:id', authorizationTodo, TodosController.deleteData)
module.exports = router;