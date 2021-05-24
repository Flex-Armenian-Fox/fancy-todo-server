const router = require('express').Router()
const TodoController = require('../controllers/todo_controller.js')

router.get('/', TodoController.getTodos)

router.post('/', TodoController.createTodo)

module.exports = router