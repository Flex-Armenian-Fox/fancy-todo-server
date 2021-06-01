const { comparePassword } = require('../helpers/bycrpt.js')
const {users} = require('../models/index.js')
const bcryptjs = require("bcryptjs")
const { generateToken } = require('../helpers/jwt.js')

class UsersController{
    static register(req, res, next) {
        users.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(result => {
            res.status(201).json({
                message: "user created"
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next){
        users.findOne({
            where: {email: req.body.email}
        })
        .then(result => {
            console.log(result)
            if (!result) {
                throw{
                    name: "LoginError",
                    message: `User Or Password Incorrect"`
                }
            }

            const checkPW = comparePassword(req.body.password, result.password)

            if (!checkPW){
                throw {
                    name: "LoginError",
                    message: "User Or Password Incorrect"
                }
            }

            //kirim token
            const token = generateToken({
                id: result.id,
                email: result.email,
            });

            res.status(200).json({
                access_token: token,
            })
        })
        .catch(err => {
            next(err)
            // if (err.name = "LoginError")
            //     return res.status(400).json({
            //         message: "incorrect user email or password"
            //     })

            // res.status(500).json({
            //     message: err
            // })
        })
    }
}

module.exports = UsersController;   