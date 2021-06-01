const express = require('express');
const router = express.Router();
const todoC = require('../controllers/todo-controller')
const {authentication, todoAuth} = require('../middlewares/auth')

router.get('/:id', todoAuth, todoC.getById)
router.get('/', todoC.getTodo)
router.patch('/:id', todoAuth, todoC.patchTodo)
router.put('/:id', todoAuth, todoC.putTodo)
router.delete('/:id', todoAuth, todoC.deleteTodo)
router.post('/', todoC.postTodo)

module.exports = router; 