const { verifyToken } = require('../helpers/jwt.js')
const { User, Todo } = require('../models')
const CustomError = require('./error_handler.js')

const authenticateUser = async (req, res, next) => {
    try {
        const decodedPayload = verifyToken(req.headers.access_token)
        const { id } = decodedPayload
        const user = await User.findByPk(id)

        if (!user) {
            throw new CustomError('NotFound', 404, {
                table: 'User',
                id: id
            })
        }
        
        req.currentUser = { id: user.id }
        next()
    } catch (error) {
        next(error)
    }
}

const authorizeUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const userId =  req.currentUser.id
        const todo = await Todo.findOne({
            where: { id }
        })
        
        if (!todo) {
            throw new CustomError('NotFound', 404, {
                table: 'Todo',
                id: id
            })
        }

        if (todo.user_id !== userId) throw new CustomError('Unauthorized')
    
        req.currentUser.todo = todo
    
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authenticateUser, authorizeUser }