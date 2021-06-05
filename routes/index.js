const router = require('express').Router()
const todoRouter = require('./todo_routes.js')
const userRouter = require('./users_router.js')
const { authenticateUser } = require('../middlewares/auth.js')

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Fancy TODO API' })
})

router.use('/users', userRouter)

router.use(authenticateUser)

router.use('/todos', todoRouter)

module.exports = router