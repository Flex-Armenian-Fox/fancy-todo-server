const express = require('express');
const router = express.Router();
const todoC = require('../controllers/todo-controller')
const userC = require('../controllers/user-controller')

router.get('/todos/:id', todoC.getById)
router.get('/todos', todoC.getTodo)
router.put('/todos/:id', todoC.putTodo)
router.delete('/todos/:id', todoC.deleteTodo)
router.patch('/todos/:id', todoC.patchTodo)
router.post('/todos', todoC.postTodo)

router.post('/users/register', userC.postRegister)
router.post('/users/login', userC.postLogin)

module.exports = router; 