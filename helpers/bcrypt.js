const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(10)

const encryptPassowrd = (password) => {
    return bcryptjs.hashSync(password, salt)
}

const comparePassword = (input, password) => {
    return bcryptjs.compareSync(input, password)
}

module.exports = {
    encryptPassowrd,
    comparePassword
}