'use strict'

const route = require('express').Router()
const routeTodos = require('./route-todos.js')
const routeUsers = require('./route-users.js')
const {verifyToken} = require('../helpers/jwt.js')
const { User, Todo } = require('../models')

function authenticate (req, res, next) { // token disimpan di HEADERS sebagai req.headers.namaKeyNyaDiSini
    try {
        const accessToken = req.headers.accesstoken
        const resultVerifyToken = verifyToken(accessToken) // kalau secret keynya beda, akan langsung dilempar ke CATCH paling bawah
        console.log(resultVerifyToken)
        User.findByPk(resultVerifyToken.id)
            .then(user => { // masuk sini kalau ketemu ID user yg sama dari hasil VerifyToken
                console.log('MASUK THEN')
                if (!user) {
                    throw {
                        name: 'AuthenticationFail',
                        message: `User with ID ${resultVerifyToken.id} not found`
                    }
                }
            })
            .catch(err => {
                console.log('MASUK CATCH Dalem')
                if (err.name === 'AuthenticationFail') {
                    res.status(404).json({
                        message: 'Authentication Failure'
                    })
                }
            })

    } catch (err) {
        console.log('masuk ERROR')
        console.log(err)
    }
}

route.use('/users', routeUsers)

route.use(authenticate)
route.use('/todos', routeTodos)

module.exports = route