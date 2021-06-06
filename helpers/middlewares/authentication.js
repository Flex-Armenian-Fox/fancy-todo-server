'use strict'

const { User, Todo } = require('../../models')
const {verifyToken} = require('../jwt.js')

function authenticate (req, res, next) { // token disimpan di HEADERS sebagai req.headers.namaKeyNyaDiSini
    try {
        const accessToken = req.headers.accesstoken
        const resultVerifyToken = verifyToken(accessToken) // kalau secret keynya beda, akan langsung dilempar ke CATCH paling bawah
        User.findByPk(resultVerifyToken.id)
            .then(user => { // kalau Verify Tokennya: TIDAK ERROR
                if (!user) { // kalau User Id dari VerifyToken: TIDAK TERDAFTAR di DB, lempar CATCH
                    throw {
                        name: 'AuthenticationFail',
                        message: `User with ID ${resultVerifyToken.id} not found`
                    }
                } else { // kalau User Id dari VerifyToken: ADA TERDAFTAR di DB
                    
                    req.currentUser = {id: user.id}
                    next()
                }
            })
            .catch(err => { // kalau User Id/hal lainnya error (meskipun VerifyTokennya baik2 saja)
                if (err.name === 'AuthenticationFail') {
                    res.status(404).json({
                        message: 'Authentication Failure'
                    })
                }
            })

    } catch (err) { // kalau Verify Tokennya: ERROR
        if (err === 'JsonWebTokenError: jwt must be provided') {
            res.status(401).json({
                message: 'You must be a registered user first'
            })
        } else {
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}

module.exports = {authenticate}