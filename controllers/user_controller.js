const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

class Controller {
    static async registerUser(req, res, next) {
        try {
            const user = await User.create({
                email: req.body.email,
                password: req.body.password
            })
            const { id, email, createdAt } = user
    
            res.status(201).json({
                message: 'User create successfully',
                data: { id, email, createdAt }
            })            
        } catch (error) {
            const { name, message } = err
            next({ name, message })            
        } 
    }

    static async login(req, res, next) {
        try {
            const user = await User.findOne({
                where: { email: req.body.email }
            })
            
            if (!user) throw { name: 'LoginFailed' }
            
            const { id, email } = user
            const payload = { id, email }
            const isValidPassword = comparePassword(req.body.password, user.password)
    
            if (!isValidPassword) throw { name: 'LoginFailed' }
    
            const token = generateToken(payload)
    
            res.status(200).json({ message: 'Login Success', access_token: token })
        } catch (error) {
            const { name, message } = error
            next({ name, message })
        }
    }
}

module.exports = Controller