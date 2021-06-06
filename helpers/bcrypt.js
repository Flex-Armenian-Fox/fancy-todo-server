'use strict'
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(8)

function hashPassword (password_input) {
    const hashedPassword = bcrypt.hashSync(password_input, salt)
    return hashedPassword
}

function comparePassword (password_input, hash) {
    const isVerified = bcrypt.compareSync(password_input, hash)
    return isVerified
}

module.exports = {
    hashPassword,
    comparePassword
}