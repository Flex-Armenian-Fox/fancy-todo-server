const { verifyToken } = require('../helpers/jwt.js')
const { User, Todo } = require('../models')

const authenticateUser = (req, res, next) => {
    try {
        const decodedPayload = verifyToken(req.headers.access_token)
        const { id } = decodedPayload

        User.findByPk(id)
        .then(user => {
            if (!user) {
                throw { name: 'UserNotAuthorized', message: 'Invalid credentials' }
            }

            req.currentUser = { id: user.id }            
            next()
        })
        .catch(err => {
            const { name, message } = err

            if (name == 'UserNotAuthorized') return res.status(401).json({ message })

            res.status(500).json(err)
        })
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' })
    }
}

const authorizeUser = (req, res, next) => {
    const { id } = req.params
    const userId =  req.currentUser.id

    console.log("auth::::", req.params)

    Todo.findOne({
        where: { id }
    })
    .then((todo) => {
        if (!todo) {
            throw { name: 'MovieNotFound', message: `Movie with id ${id} not found` }
        }

        if (todo.user_id !== userId) {
            throw { name: 'UserNotAuthorized', message: `You are not authorized` }
        }

        next()
    }).catch((err) => {
        const { name, message } = err

        if (name == 'MovieNotFound') return res.status(404).json({ message })

        if (name == 'UserNotAuthorized') return res.status(401).json({ message })

        res.status(500).json(err)
    });
}

module.exports = { authenticateUser, authorizeUser }