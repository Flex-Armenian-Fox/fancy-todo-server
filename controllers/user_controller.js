const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')

class Controller {
    static registerUser(req, res) {
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
            if (err.name == "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: 'Email already exist'
                })
            }
            res.status(500).json(err)
        }) 
    }

    static login(req, res) {
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'invalid credentials' })

            const isValidPassword = comparePassword(password, user.password)

            if (!isValidPassword) return res.status(404).json({ message: 'invalid credentials' })

            res.status(200).json({
                message: 'Login Success',
                data: user
            })
        })
        .catch(err => {            
            res.status(500).json(err)
        })
    }
}

module.exports = Controller