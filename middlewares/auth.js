const { verifyToken } = require('../helpers/jwt.js')
const { User, Todo } = require('../models')

const authenticateUser = async (req, res, next) => {
    try {
        const decodedPayload = verifyToken(req.headers.access_token)
        const { id } = decodedPayload
        const user = await User.findByPk(id)

        if (!user) {
            throw { 
                name: 'UserNotFound', 
                data: { table: 'User', id }
            }
        }
        
        req.currentUser = { id: user.id }
        next()
    } catch (error) {
        const { name, data } = error
        next({ name, data })
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
            throw { 
                name: 'TodoNotFound', 
                data: { table: 'Todo', id }
            }
        }

        if (todo.user_id !== userId) throw { name: 'Unauthorized' }
    
        req.currentUser.todo = todo
    
        next()
    } catch (error) {
        const { name, data } = error
        next({ name, data })
    }
}

module.exports = { authenticateUser, authorizeUser }