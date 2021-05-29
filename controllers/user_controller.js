const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

class Controller {
    static registerUser(req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            const { id, email, createdAt } = user

            res.status(201).json({
                message: 'User create successfully',
                data: { id, email, createdAt }
            })
        })
        .catch(err => {
            const { name, message } = err

            next({ name, message })
        }) 
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
        .then(user => {                        
            if (!user) throw { name: 'LoginFailed' }
            
            const { id, email } = user
            const payload = { id, email }
            const isValidPassword = comparePassword(password, user.password)

            if (!isValidPassword) throw { name: 'LoginFailed' }

            const token = generateToken(payload)

            res.status(200).json({ message: 'Login Success', access_token: token })
        })
        .catch(err => {    
            const { name, message } = err

            next({ name, message })

        })
    }
}

module.exports = Controller