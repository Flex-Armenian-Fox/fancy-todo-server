const router = require('express').Router()
const TodoController = require('../controllers/todo_controller.js')
const { authorizeUser } =  require('../middlewares/auth.js')

router.get('/', TodoController.getTodos)

router.get('/:id', authorizeUser, TodoController.getTodoById)

router.post('/', TodoController.createTodo)

router.put('/:id', authorizeUser, TodoController.putTodo)

router.patch('/:id', authorizeUser, TodoController.patchTodo)

router.delete('/:id', authorizeUser, TodoController.deleteTodo)

module.exports = router