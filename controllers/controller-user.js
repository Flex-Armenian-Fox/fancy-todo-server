'use strict'

const { User, Todo } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

class ControllerUser {

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