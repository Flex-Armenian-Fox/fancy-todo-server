const express = require('express');
const router = express.Router();
const todoC = require('../controllers/todo-controller')
const {authentication, todoAuth} = require('../middlewares/auth')

router.get('/:id', authentication, todoAuth, todoC.getById)
router.get('/', todoC.getTodo)
router.put('/:id', authentication, todoAuth, todoC.putTodo)
router.delete('/:id', authentication, todoAuth, todoC.deleteTodo)
router.patch('/:id', authentication, todoAuth, todoC.patchTodo)
router.post('/', authentication, todoC.postTodo)

module.exports = router; 