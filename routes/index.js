const router = require('express').Router()
const todoRouter = require('./todo_routes.js')

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Fancy TODO API' })
})

router.use('/todos', todoRouter)

module.exports = router