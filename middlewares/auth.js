const { verifyToken } = require('../helpers/jwt.js')
const { User } = require('../models')

const authenticateUser = (req, res, next) => {
    try {
        const decodedPayload = verifyToken(req.headers.access_token)
        const { id } = decodedPayload

        User.findByPk(id)
        .then(user => {
            if (!user) {
                throw {
                    name: 'AuthenticationError',
                    message: 'Invalid credentials'
                }
            }
            req.currentUser = user.id
            next()
        })
        .catch(err => {
            console.log(err)
            res.status(401).json({ message: 'Invalid credentials' })
        })
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' })
    }
}

module.exports = { authenticateUser }