const { User, Todo } = require('../models/index')
const {jwtEncrypt, jwtDecrypt} = require('../helpers/jwt')
const {compareHash} = require('../helpers/brcypt')
const GCLIENTID = process.env.DEV_G_CLIENT_ID
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(GCLIENTID);

class Controller{
    static postRegister(req, res, next){
        if (!req.body.email || !req.body.password) throw {name: "FillEmailPassword"}
        User.create(req.body)
            .then(() => {
                res.status(200).json({message: "User Registered", email:req.body.email})
            })
            .catch((err) => {
                next(err)
            })
    }

    static postLogin(req, res, next){
        if (!req.body.email || !req.body.password) throw {name: "FillEmailPassword"}
        User.findOne({where:{email: req.body.email.toLowerCase()}})
            .then(user => {
                if (!user) throw {name: "noEmail"}
                if(compareHash(req.body.password, user.password)){
                    const token = jwtEncrypt({id: user.id, email: user.email})
                    res.status(200).json({message: "login successful", access_token: token})
                }
                else throw {name: "wrongPassword"}
            })
            .catch((err) =>{
                next(err)
            })
    }

    static postGAuth(req, res, next){
        let gEmail = ""
        client.verifyIdToken({
            idToken: req.body.token,
            audience: GCLIENTID
        }).then(token =>{
            let payload = token.getPayload()
            gEmail = payload.email
            return User.findOne({where:{email:gEmail}})
        }) 
        .then(user => {
            if (!user) {
                let randPass = String(Math.random())
                return User.create({email: gEmail, password: randPass}, {returning:true})
            } else return user
        })
        .then(user => {
            const token = jwtEncrypt({id: user.id, email: user.email})
            res.status(200).json({message: "login successful", access_token: token})
        })
        .catch(err => {
            next(err)
        })   
    }
}

module.exports = Controller