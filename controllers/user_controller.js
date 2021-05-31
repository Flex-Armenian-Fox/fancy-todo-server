const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')
const CustomError = require('../middlewares/error_handler.js')

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
            next(error)
        } 
    }

    static async login(req, res, next) {
        try {
            const user = await User.findOne({
                where: { email: req.body.email }
            })
            
            if (!user) throw new CustomError('LoginFailed', 400)
            
            const { id, email } = user
            const payload = { id, email }
            const isValidPassword = comparePassword(req.body.password, user.password)
    
            if (!isValidPassword) throw new CustomError('LoginFailed', 400)
    
            const token = generateToken(payload)
    
            res.status(200).json({ message: 'Login Success', access_token: token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller