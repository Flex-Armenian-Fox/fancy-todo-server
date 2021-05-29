const { verifyToken } = require('../helpers/jwt.js')
const { User, Todo } = require('../models')

const authenticateUser = (req, res, next) => {
    try {
        const decodedPayload = verifyToken(req.headers.access_token)
        const { id } = decodedPayload

        User.findByPk(id)
        .then(user => {
            if (!user) {
                throw { name: 'UserNotFound', data: {
                    table: 'User',
                    id
                }}
            }

            req.currentUser = { id: user.id }
            next()
        })
        .catch(err => {
            const { name, data } = err

            next({ name, data })
        })
    } catch (error) {
        const { name } = error

        next({ name })
    }
}

const authorizeUser = (req, res, next) => {
    const { id } = req.params
    const userId =  req.currentUser.id

    Todo.findOne({
        where: { id }
    })
    .then((todo) => {
        if (!todo) {
            throw { name: 'TodoNotFound', data: {
                table: 'Todo',
                id
            }}
        }

        if (todo.user_id !== userId) {
            throw { name: 'Unauthorized' }
        }

        req.currentUser.todo = todo

        next()
    }).catch((err) => {
        const { name, data } = err

        next({ name, data })
    });
}

module.exports = { authenticateUser, authorizeUser }