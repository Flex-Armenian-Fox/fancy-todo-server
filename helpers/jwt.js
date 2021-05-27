const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY_JWT
const jwtEncrypt = (payload) =>{console.log(SECRET_KEY) 
    return jwt.sign(payload, SECRET_KEY)} 

const jwtDecrypt = (token) => jwt.verify(token, SECRET_KEY)

module.exports = {jwtDecrypt, jwtEncrypt}