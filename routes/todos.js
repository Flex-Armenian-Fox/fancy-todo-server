const express = require('express');
const router = express.Router();
const todoC = require('../controllers/todo-controller')

router.get('/:id', todoC.getById)
router.get('/', todoC.getTodo)
router.put('/:id', todoC.putTodo)
router.delete('/:id', todoC.deleteTodo)
router.patch('/:id', todoC.patchTodo)
router.post('/', todoC.postTodo)

module.exports = router; 