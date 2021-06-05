const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')
const CustomError = require('../middlewares/error_handler.js')
const { OAuth2Client } = require('google-auth-library')
const faker = require('faker')

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

    static async googleLogin(req, res, next) {
        try {
            const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
            const { google_token } = req.body
            const client = new OAuth2Client(GOOGLE_CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: GOOGLE_CLIENT_ID
            })
            const decodedTicket = ticket.getPayload()
            const { email: googleEmail } = decodedTicket
            const user = await User.findOne({
                where: { email: googleEmail }
            })
            let tokenId = null
            let tokenEmail = null

            if (!user) {
                const newUser = await User.create({
                    email: googleEmail,
                    password: faker.internet.password(10),
                    register_via: 'Google Auth'
                })
                tokenId = newUser.id
                tokenEmail = newUser.email
            } else {
                tokenId = user.id
                tokenEmail = user.email
            }

            const token = generateToken({
                id: tokenId,
                email: tokenEmail
            })

            return res.status(200).json({ message: 'Login Success', access_token: token })            
        } catch (error) {
            next(error)
        }
    }    

    static async facebookLogin(req, res, next) {
        try {
            const { error, email: facebookEmail } = req.body
            const user = await User.findOne({
                where: { email: facebookEmail }
            })
            let tokenId = null
            let tokenEmail = null

            if (error) {
                throw new CustomError('FacebookLoginError', 401, null, "Error Login With Facebook")
            }

            if (!user) {
                const newUser = await User.create({
                    email: facebookEmail,
                    password: faker.internet.password(10),
                    register_via: 'Facebook Auth'
                })
                tokenId = newUser.id
                tokenEmail = newUser.email
            } else {
                tokenId = user.id
                tokenEmail = user.email
            }
            
            const token = generateToken({
                id: tokenId,
                email: tokenEmail
            })

            return res.status(200).json({ message: 'Login Success', access_token: token })
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