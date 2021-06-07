const { comparePassword } = require('../helpers/bycrpt.js')
const {users} = require('../models/index.js')
const bcryptjs = require("bcryptjs")
const { generateToken } = require('../helpers/jwt.js')
const {OAuth2Client} = require('google-auth-library');

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

    static loginGoogle(req, res, next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const {id_token_google } =req.body;
        let emailUser = "";

        client.verifyIdToken({
            idToken: id_token_google,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            const {email} = payload
            emailUser = email;

            return users.findOne({
                where: {email: emailUser}
            })
        }).then(user => {
            if (!user) {
                console.log("create user")
                return users.create({
                    email: emailUser,
                    password: String(Math.random()) + String(Math.random())
                })
            } else {
                console.log("DONE user")
                return {
                    id: user.id,
                    email: user.email
                }
            }
        })
        .then(user => {
            console.log("user ==>", user)
            const token = generateToken({
                id: user.id,
                email: user.email
            })

            res.status(201).json({access_token: token})
        })
    }

    static login(req, res, next){
        console.log(req)
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