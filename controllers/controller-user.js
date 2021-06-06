'use strict'

const { User, Todo } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

// GOOGLE LOG-IN VERIFICATION -- OAUTH:
const {OAuth2Client} = require('google-auth-library')

class ControllerUser {

    static googleLogin (req, res, next) {
        // proses verfikasi access_token Google oleh Google
            // karena Google punya SECRET KEY internal sendiri untuk verify token
            // dan ini pakai APInya Google, maka harus Google yg verify bener nggak tuh token di-issue/generate oleh internalnya dia
        
        const client = new OAuth2Client(process.env.CLIENT_ID)
        // CLIENT_ID -> yg tadi didapat daftar Credentials di Google
        // bersifat rahasia, makanya dimasukkan ke .ENV

        let emailToRegister = ''
        const {google_access_token} = req.headers

        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                return ticket.getPayload()
            })
            .then(payload => {
                console.log(payload)
                emailToRegister = payload.email
                return User.findOne({where: {email: payload.email}}) // check User dengan email ini sudah terdaftar belum di DB kita
            })
            .then(user => {
                if (!user) { // kalau (null) => BELUM TERDAFTAR: maka kita Create manual, pakai email yg dari payload tadi
                    return User.create({
                        email: emailToRegister,
                        password: Math.random().toString(36).slice(-8) // random password generator
                    })
                } else { // kalau SUDAH TERDAFTAR: langsung aja ke proses berikutnya
                    return user
                }
            })
            .then(user => { // di sini kita udah punya EMAIL dan PASSWORD yg OK untuk didaftarkan
                // sekarang create JWTnya, sama seperti pas login manual (di bawah)
                const token = generateToken({
                    id: user.id,
                    email: user.email
                })
                console.log(token)
                return res.status(200).json({
                    accesstoken: token
                })
            })
            .catch(err => {
                // next(err)
                console.log(err)
            })

    }

    static register (req, res, next) {
        const input = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOrCreate({
            where: {email: input.email},
            defaults: input
        })
            .then(result => {
                if (result[1] === false) {
                    throw {
                        name: 'UniqueConstraintError',
                        message: 'Email already registered'
                    }
                } else {
                    res.status(201).json({
                        message: 'New user successfully created',
                        data: result[0].email
                    })
                }
            })
            .catch(err => {
                next(err)
                // if (err.name === 'UniqueConstraintError') {
                //     res.status(409).json({
                //         message: err.message
                //     })
                // } else if (err.name = 'SequelizeValidationError') {
                //     res.status(400).json({
                //         message: err.errors[0].message
                //     })
                // } else {
                //     res.status(500).json({
                //         message: 'Internal Server Error'
                //     })
                // }
            })
    }

    static login (req, res, next) {
        const input = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {email: input.email}
        })
            .then(result => {
                if (!result) { // kalau EMAIL: TIDAK DITEMUKAN
                    throw {
                        name: 'Not Found',
                        message: 'Email/Password incorrect'
                    }
                } else { // kalau EMAIL: DITEMUKAN
                    // skrg COMPARE PASSWORDnya: TRUE / FALSE
                    const isPasswordValid = comparePassword(input.password, result.password)

                    if (!isPasswordValid) { // kalau PASSWORDnya FALSE
                        throw {
                            name: 'Login Fail',
                            message: 'Email/Password incorrect'
                        }
                    } else { // kalau PASSWORDnya TRUE
                        // skrg JWT generate tokennya
                        const token = generateToken({
                            id: result.id,
                            email: result.email
                        })
                        res.status(200).json({
                            accesstoken: token
                        })
                    }
                }
            })
            .catch(err => {
                next(err)
                // if (err.name === 'Not found' || err.name === 'Login Fail') {
                //     res.status(404).json({
                //         message: err.message
                //     })
                // } else {
                //     res.status(500).json({
                //         message: 'Internal Server Error'
                //     })
                // }
            })
    }

}

module.exports = ControllerUser